import { Networking } from "@flamework/networking";
import { EItemClass, GameItem } from "./types/GameItem";

interface ClientToServerEvents {}

interface ServerToClientEvents {
	inventory: {
		addItem(item: GameItem): void;
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
}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
