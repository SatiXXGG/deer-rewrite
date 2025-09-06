import { Controller, Modding, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { onCharacterAdded } from "./interface";
import { ICharacter } from "shared/components/types/Character";

@Controller({})
class OnCharacterAdded implements OnStart {
	private localPlayer = Players.LocalPlayer;
	onStart() {
		const listeners = new Set<onCharacterAdded>();
		Modding.onListenerAdded<onCharacterAdded>((listener) => {
			listeners.add(listener);
		});
		Modding.onListenerRemoved<onCharacterAdded>((listener) => {
			listeners.delete(listener);
		});

		this.localPlayer.CharacterAdded.Connect((character) => {
			listeners.forEach((listener) => {
				task.spawn(() => {
					listener.onCharacterAdded(character as ICharacter);
				});
			});
		});

		if (this.localPlayer.Character) {
			listeners.forEach((listener) => {
				task.spawn(() => {
					listener.onCharacterAdded(this.localPlayer.Character as ICharacter);
				});
			});
		}
	}
}
