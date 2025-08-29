import { Service, OnStart, Modding } from "@flamework/core";
import { onPlayerJoined } from "./interface";
import { Players } from "@rbxts/services";

@Service({})
export class Index implements OnStart {
	onStart() {
		const listeners = new Set<onPlayerJoined>();
		Modding.onListenerAdded<onPlayerJoined>((listener) => {
			listeners.add(listener);
		});
		Modding.onListenerRemoved<onPlayerJoined>((listener) => {
			listeners.delete(listener);
		});

		Players.PlayerAdded.Connect((player) => {
			listeners.forEach((listener) => {
				listener.onJoin(player);
			});
		});

		Players.GetPlayers().forEach((player) => {
			listeners.forEach((listener) => {
				listener.onJoin(player);
			});
		});
	}
}
