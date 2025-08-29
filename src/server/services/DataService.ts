import { Service, OnStart } from "@flamework/core";
import ProfileStore, { Profile } from "@rbxts/profile-store";
import { Players } from "@rbxts/services";
import { onPlayerJoined } from "server/modding/onPlayerJoined/interface";
import { EItemClass, GameItem } from "shared/types/GameItem";
import { ItemService } from "./ItemService";
import { EDeerSkins } from "shared/data/Skins";

interface IPlayerData {
	cash: 0;
	inventory: GameItem[];
	currentDeer: EDeerSkins;
	lastJoin: number;
	lastReward: number;
	currentReward: number;
}

@Service({})
export class DataService implements OnStart, onPlayerJoined {
	private DataKey = "PlayerData-(0.0.0)";

	private profiles: Map<Player, Profile<IPlayerData>> = new Map();
	private template: IPlayerData = {
		currentDeer: EDeerSkins.default,
		cash: 0,
		inventory: [],
		lastJoin: 0,
		lastReward: 0,
		currentReward: 0,
	};
	private Store = ProfileStore.New(this.DataKey, this.template);

	constructor(private ItemService: ItemService) {}
	onStart() {}

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
	give(itemClass: EItemClass, id: string) {
		const hasItem = this.has(Players.LocalPlayer, itemClass, id);
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

		const profile = this.getProfile(Players.LocalPlayer);
		profile.Data.inventory.push(item);
	}
}
