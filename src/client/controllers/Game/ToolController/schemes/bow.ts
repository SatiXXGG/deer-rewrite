import { Players } from "@rbxts/services";
import { IToolScheme } from "../scheme";
import { ICharacter } from "shared/components/types/Character";
import { Events } from "client/network";

export const TsBow = {
	isEquipped: false,
	equipped(character: ICharacter) {
		this.isEquipped = true;
	},
	unequipped(character: ICharacter) {
		this.isEquipped = false;
	},
	setup(character: ICharacter) {
		const player = Players.GetPlayerFromCharacter(character)!;
		const mouse = player.GetMouse();
		let cooldown = false;
		mouse.Button1Down.Connect(() => {
			if (this.isEquipped && !cooldown) {
				Events.bow.shot(mouse.Hit.Position);
				cooldown = true;
				task.delay(1, () => {
					cooldown = false;
				});
			}
		});
		player.CameraMode = Enum.CameraMode.LockFirstPerson;
		player.CameraMinZoomDistance = 0.5;

		/** arrows */
	},
	tool: undefined,
} satisfies IToolScheme & { isEquipped: boolean };
