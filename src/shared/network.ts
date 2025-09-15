import { Networking } from "@flamework/networking";
import { EItemClass, GameItem } from "./types/GameItem";
import { EQuests, EQuestStatus, IQuestData } from "./data/Quest";
import { EUserSetting } from "./data/UserSettings";
import { NetworkUnreliable } from "@flamework/networking/out/types";

interface ClientToServerEvents {
	bow: {
		shot(hit: Vector3): void;
	};
	gameplay: {
		eat(mushroom: Model): void;
		taunt(): void;
		attack(): void;
		trap(): void;
	};

	quest: {
		claim(id: number): void;
	};
	rewards: {
		claim(): void;
	};
	settings: {
		set(setting: EUserSetting, value: boolean | number): void;
	};
}

interface ServerToClientEvents {
	inventory: {
		addItem(item: GameItem): void;
	};
	quests: {
		updateQuest(id: number, current: number, status: EQuestStatus): void;
	};
	trap: {
		set: NetworkUnreliable<() => void>;
	};
}

interface ClientToServerFunctions {
	skins: {
		buy(Class: EItemClass, id: string): boolean;
		isEquipped(Class: EItemClass, id: string): boolean;
	};
	inventory: {
		getInventoryItems(): GameItem[];
		equip(Class: EItemClass, id: string): boolean;
	};
	quests: {
		getQuests(): IQuestData[];
	};
	settings: {
		get(setting: EUserSetting): boolean | number;
	};
}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
