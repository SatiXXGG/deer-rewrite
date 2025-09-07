import { Networking } from "@flamework/networking";
import { EItemClass, GameItem } from "./types/GameItem";
import { IQuestData } from "./data/Quest";

interface ClientToServerEvents {
	bow: {
		shot(hit: Vector3): void;
	};
	gameplay: {
		eat(mushroom: Model): void;
		taunt(): void;
		attack(): void;
	};
}

interface ServerToClientEvents {
	inventory: {
		addItem(item: GameItem): void;
	};
	quests: {
		updateQuest(id: number, current: number): void;
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
}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
