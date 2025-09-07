import { Service, OnStart } from "@flamework/core";
import ProfileStore, { Profile } from "@rbxts/profile-store";
import { Players } from "@rbxts/services";
import { onPlayerJoined } from "server/modding/onPlayerJoined/interface";
import { EItemClass, GameItem } from "shared/types/GameItem";
import { ItemService } from "./ItemService";
import { EDeerSkins, ETauntSkins, EWendigoSkins, GetInfoByClass, IBuyableInfo } from "shared/data/Skins";
import { Events, Functions } from "server/network";
import { IQuestData } from "shared/data/Quest";

interface IPlayerData {
	cash: number;
	inventory: GameItem[];
	currentDeer: EDeerSkins;
	currentWendigo: EWendigoSkins;
	currentTaunt: ETauntSkins;
	quests: IQuestData[];
	lastJoin: number;
	lastReward: number;
	currentReward: number;
	gaveDailyQuests: number;
	gaveWeeklyQuests: number;
}

@Service({})
export class DataService implements OnStart, onPlayerJoined {
	private DataKey = "PlayerData-(0.0.4)";

	private profiles: Map<Player, Profile<IPlayerData>> = new Map();
	private template: IPlayerData = {
		quests: [],
		currentDeer: EDeerSkins.default,
		currentWendigo: EWendigoSkins.default,
		currentTaunt: ETauntSkins.default,
		cash: 99999,
		inventory: [],
		lastJoin: 0,
		lastReward: 0,
		currentReward: 0,
		gaveDailyQuests: 0,
		gaveWeeklyQuests: 0,
	};
	private Store = ProfileStore.New(this.DataKey, this.template);

	constructor(private ItemService: ItemService) {}
	onStart() {
		Functions.skins.buy.setCallback((player, Class, id) => {
			const info = this.ItemService.getInfo<IBuyableInfo>(Class, id);
			if (info) {
				const { price } = info;
				if (this.hasCash(player, price)) {
					this.addCash(player, -price);
					this.give(player, Class, id);
					this.setCurrentSkin(Class, id, player);
					return true;
				}
			}
			return false;
		});

		Functions.inventory.getInventoryItems.setCallback((player) => {
			return this.waitForLoad(player).then(() => {
				const profile = this.getProfile(player);
				return profile.Data.inventory;
			});
		});

		Functions.skins.isEquipped.setCallback((player, Class, id) => {
			if (this.has(player, Class, id)) {
				const profile = this.getProfile(player);
				if (Class === EItemClass.deer) {
					return profile.Data.currentDeer === id;
				} else if (Class === EItemClass.wendigo) {
					return profile.Data.currentWendigo === id;
				} else if (Class === EItemClass.taunt) {
					return profile.Data.currentTaunt === id;
				}
			}
			return false;
		});

		Functions.inventory.equip.setCallback((player, Class, id) => {
			if (this.has(player, Class, id)) {
				const profile = this.getProfile(player);
				if (Class === EItemClass.deer) {
					if (profile.Data.currentDeer === id) {
						profile.Data.currentDeer = EDeerSkins.default;
						return false;
					}
					profile.Data.currentDeer = id as EDeerSkins;
					return true;
				} else if (Class === EItemClass.wendigo) {
					if (profile.Data.currentWendigo === id) {
						profile.Data.currentWendigo = EWendigoSkins.default;
						return false;
					}
					profile.Data.currentWendigo = id as EWendigoSkins;
					return true;
				} else if (Class === EItemClass.taunt) {
					if (profile.Data.currentTaunt === id) {
						profile.Data.currentTaunt = ETauntSkins.default;
						return false;
					}
					profile.Data.currentTaunt = id as ETauntSkins;
					return true;
				}
			}
			return false;
		});
	}

	load(player: Player): Profile<IPlayerData> {
		const key = `PlayerData-${player.UserId}`;
		const session = this.Store.StartSessionAsync(key, {
			Cancel: () => {
				return !player.IsDescendantOf(Players);
			},
		});
		session.Reconcile();

		return session;
	}

	onJoin(player: Player) {
		const profile = this.load(player);
		print(`🤠 Player ${player.Name} loaded!`);
		print(profile.Data);
		this.profiles.set(player, profile);
		player.SetAttribute("loaded", true);

		/** Daily quests */
		print("gave quests: ", tick() - profile.Data.gaveDailyQuests / 60, " mins ago");
	}

	getProfile(player: Player) {
		const profile = this.profiles.get(player);
		assert(profile, `💔 Profile not found for player ${player.Name}`);
		return profile;
	}

	has(player: Player, itemClass: EItemClass, id: string) {
		const profile = this.getProfile(player);
		const has = profile.Data.inventory.some((item) => item.class === itemClass && item.id === id);
		return has;
	}

	getCurrentDeer(player: Player) {
		const profile = this.getProfile(player);
		return profile.Data.currentDeer;
	}

	setCurrentSkin(Class: EItemClass, id: string, player: Player) {
		const profile = this.getProfile(player);
		switch (Class) {
			case EItemClass.deer:
				profile.Data.currentDeer = id as EDeerSkins;
				break;
			case EItemClass.wendigo:
				profile.Data.currentWendigo = id as EWendigoSkins;
				break;
			case EItemClass.taunt:
				profile.Data.currentTaunt = id as ETauntSkins;
				break;
			default:
				break;
		}
	}

	getCurrentWendigo(player: Player) {
		const profile = this.getProfile(player);
		return profile.Data.currentWendigo;
	}

	give(player: Player, itemClass: EItemClass, id: string) {
		const hasItem = this.has(player, itemClass, id);
		if (hasItem) {
			warn("🎉 You already have this item, this is a dev error");
			return;
		}
		const info = this.ItemService.getInfo(itemClass, id);
		if (!info) {
			warn("🥶 Item not found, this is a dev error", itemClass, id);
			return;
		}
		//todo: check if item exists with the ItemService
		const item: GameItem = {
			id: id,
			class: itemClass,
		};
		Events.inventory.addItem(player, item);
		const profile = this.getProfile(player);
		profile.Data.inventory.push(item);
	}

	hasCash(player: Player, amount: number) {
		const profile = this.getProfile(player);
		return profile.Data.cash >= amount;
	}

	addCash(player: Player, amount: number) {
		const profile = this.getProfile(player);
		profile.Data.cash += amount;
	}

	waitForLoad(player: Player) {
		return new Promise((resolve) => {
			while (!player.GetAttribute("loaded")) {
				task.wait();
			}
			resolve(undefined);
		});
	}
}
