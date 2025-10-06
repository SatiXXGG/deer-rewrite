import { Service, OnStart } from "@flamework/core";
import ProfileStore, { Profile } from "@rbxts/profile-store";
import { Players } from "@rbxts/services";
import { onPlayerJoined } from "server/modding/onPlayerJoined/interface";
import { EItemClass, GameItem } from "shared/types/GameItem";
import { ItemService } from "./ItemService";
import { EBowSkins, EDeerSkins, ETauntSkins, EWendigoSkins, GetInfoByClass, IBuyableInfo } from "shared/data/Skins";
import { Events, Functions } from "server/network";
import { IQuestData } from "shared/data/Quest";
import { GameRewards } from "shared/data/Rewards";
import { EUserSetting } from "shared/data/UserSettings";

interface IPlayerData {
	cash: number;
	inventory: GameItem[];
	currentDeer: EDeerSkins;
	currentWendigo: EWendigoSkins;
	currentTaunt: ETauntSkins;
	currentBow: EBowSkins;
	quests: IQuestData[];
	lastJoin: number;

	// Daily rewards
	lastClaim: number;
	lastReward: number;
	claimedRewards: number[];

	// Quests
	gaveDailyQuests: number;
	gaveWeeklyQuests: number;

	// settings
	settings: {
		[setting in EUserSetting]: boolean | number;
	};
}

@Service({})
export class DataService implements OnStart, onPlayerJoined {
	private DataKey = "PlayerData-(0.2.2)";

	private profiles: Map<Player, Profile<IPlayerData>> = new Map();
	private template: IPlayerData = {
		quests: [],
		currentDeer: EDeerSkins.default,
		currentWendigo: EWendigoSkins.default,
		currentTaunt: ETauntSkins.default,
		currentBow: EBowSkins.default,
		cash: 1000,
		inventory: [],
		lastJoin: 0,

		lastClaim: 0,
		lastReward: 0,
		claimedRewards: [],

		gaveDailyQuests: 0,
		gaveWeeklyQuests: 0,
		settings: {
			[EUserSetting.Shadows]: false,
			[EUserSetting.Fov]: 75,
		},
	};

	private Store = ProfileStore.New(this.DataKey, this.template);

	constructor(private ItemService: ItemService) {}
	onStart() {
		Functions.skins.buy.setCallback((player, Class, id) => {
			const info = this.ItemService.getInfo<IBuyableInfo>(Class, id);
			print(info);
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

		Functions.skins.isBought.setCallback((player, Class, id) => {
			return this.has(player, Class, id);
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
				} else if (Class === EItemClass.bow) {
					return profile.Data.currentBow === id;
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
				} else if (Class === EItemClass.bow) {
					if (profile.Data.currentBow === id) {
						profile.Data.currentBow = EBowSkins.default;
						return false;
					}
					profile.Data.currentBow = id as EBowSkins;
					return true;
				}
			}
			return false;
		});

		Events.rewards.claim.connect((player) => {
			const profile = this.getProfile(player);
			const current = profile.Data.lastReward;
			const elapsed = os.time() - profile.Data.lastClaim;
			if (elapsed > 60 * 60 * 24 * 2 || profile.Data.lastReward > 6) {
				profile.Data.claimedRewards = [];
				profile.Data.lastClaim = os.time();
				profile.Data.lastReward = 0;
				return;
			}
			if (profile.Data.claimedRewards.includes(current)) return;
			profile.Data.claimedRewards.push(current);
			this.updateRewardData(player);

			/** prize */
			const { amount, reward } = GameRewards[current];

			switch (reward) {
				case "cash":
					this.addCash(player, amount);
					break;
			}

			print("🎁 Claimed reward: ", profile.Data.lastReward);
		});

		Functions.settings.get.setCallback((player, setting) => {
			const profile = this.getProfile(player);
			return profile.Data.settings[setting];
		});

		Events.settings.set.connect((player, setting, value) => {
			const profile = this.getProfile(player);
			profile.Data.settings[setting] = value;
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
		player.SetAttribute("cash", profile.Data.cash);

		player.SetAttribute("lastClaim", profile.Data.lastClaim);
		player.SetAttribute("lastReward", profile.Data.lastReward);

		const oneDay = 60 * 60 * 24;
		task.spawn(() => {
			while (player.IsDescendantOf(Players)) {
				const elapsed = os.time() - profile.Data.lastClaim;
				if (elapsed > oneDay * 2 || profile.Data.lastClaim === 0 || profile.Data.lastReward > 6) {
					profile.Data.lastClaim = os.time();
					profile.Data.claimedRewards = [];
					profile.Data.lastReward = 0;
				}
				/** calculates if a day has passed */

				if (elapsed > oneDay && profile.Data.claimedRewards.includes(profile.Data.lastReward)) {
					profile.Data.lastReward++;
					if (profile.Data.lastReward > 6) {
						profile.Data.lastClaim = os.time();
						profile.Data.claimedRewards = [];
						profile.Data.lastReward = 0;
					}
				}
				this.updateRewardData(player);
				task.wait(60);
			}
			coroutine.yield();
		});
	}

	getProfile(player: Player) {
		const profile = this.profiles.get(player);
		assert(profile, `💔 Profile not found for player ${player.Name}`);
		return profile;
	}

	updateRewardData(player: Player) {
		const profile = this.getProfile(player);
		player.SetAttribute("lastClaim", profile.Data.lastClaim);
		player.SetAttribute("lastReward", profile.Data.lastReward);
		profile.Data.claimedRewards.forEach((n) => {
			player.SetAttribute(`reward-${n}`, true);
		});
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
		player.SetAttribute("cash", profile.Data.cash);
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
