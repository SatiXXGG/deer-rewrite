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
		mouse.Button1Down.Connect(() => {
			if (this.isEquipped) {
				Events.bow.shot(mouse.Hit.Position);
			}
		});

		/** arrows */
	},
	tool: undefined,
} satisfies IToolScheme & { isEquipped: boolean };
