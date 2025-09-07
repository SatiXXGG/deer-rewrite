import { Controller, OnStart } from "@flamework/core";
import Make from "@rbxts/make";
import { Players } from "@rbxts/services";
import { Trove } from "@rbxts/trove";
import { onCharacterAdded } from "client/modding/onCharacterAdded/interface";
import { ICharacter } from "shared/components/types/Character";
import { DeerAnimations, WendigoAnimations } from "shared/data/Animations";
import { Roles } from "shared/types/RoleTags";
import getRole from "shared/utils/getRole";
import { AnimationController } from "./AnimationController";
import { EPlayerState, PlayerState } from "../data/State";

@Controller({})
export class MovementController implements OnStart, onCharacterAdded {
	private player = Players.LocalPlayer;
	private trove = new Trove();
	private roleCalls: { [key in Roles]?: (character: ICharacter) => void } = {
		[Roles.deer]: (character: ICharacter) => this.deer(character),
		[Roles.wendigo]: (character: ICharacter) => this.wendigo(character),
	};
	constructor(private AnimationController: AnimationController) {}
	onStart() {}
	onCharacterAdded(character: ICharacter): void {
		task.wait(0.1);
		this.trove.clean();
		const role = getRole(this.player);
		const callback = this.roleCalls[role];
		if (callback) callback(character);
		print("Spawned with role: ", role);
		this.movement(character, role);
	}

	movement(character: ICharacter, role: Roles) {
		const anims = role === Roles.deer ? "Deer" : "Wendigo";
		const humanoid = character.Humanoid;

		this.trove.connect(humanoid.Running, (speed) => {
			if (speed < 1) {
				this.AnimationController.play("idle" + anims, true);
			} else if (speed < 16) {
				if (PlayerState.listHasState(EPlayerState.hungry)) {
					this.AnimationController.play("run" + anims, true);
				} else {
					this.AnimationController.play("walk" + anims, true);
				}
			} else if (speed > 20) {
				this.AnimationController.play("run" + anims, true);
			}
		});
	}
	deer(character: ICharacter) {
		character.Humanoid.WalkSpeed = 16;
	}
	wendigo(character: ICharacter) {
		character.Humanoid.WalkSpeed = 20;
		this.AnimationController.play("transformation");
	}
}
