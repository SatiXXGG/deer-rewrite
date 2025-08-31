import { Networking } from "@flamework/networking";
import { EItemClass } from "./types/GameItem";

interface ClientToServerEvents {}

interface ServerToClientEvents {}

interface ClientToServerFunctions {
	skins: {
		buy(Class: EItemClass, id: string): boolean;
	};
}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
