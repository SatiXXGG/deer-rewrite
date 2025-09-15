import { Controller, OnStart } from "@flamework/core";
import Make from "@rbxts/make";
import { Players, RunService } from "@rbxts/services";
import { Trove } from "@rbxts/trove";
import { onCharacterAdded } from "client/modding/onCharacterAdded/interface";
import { ICharacter } from "shared/components/types/Character";
import { DeerAnimations, WendigoAnimations } from "shared/data/Animations";
import { Roles } from "shared/types/RoleTags";
import getRole from "shared/utils/getRole";
import { AnimationController } from "./AnimationController";
import { EPlayerState, PlayerState } from "../data/State";
import { Events } from "client/network";

@Controller({})
export class MovementController implements OnStart, onCharacterAdded {
	private player = Players.LocalPlayer;
	private trove = new Trove();
	private roleCalls: { [key in Roles]?: (character: ICharacter) => void } = {
		[Roles.deer]: (character: ICharacter) => this.deer(character),
		[Roles.wendigo]: (character: ICharacter) => this.wendigo(character),
	};
	constructor(private AnimationController: AnimationController) {}
	onStart() {
		Events.trap.set.connect(() => {
			if (!PlayerState.listHasState(EPlayerState.stunned)) {
				PlayerState.add(EPlayerState.stunned, math.huge);
				task.delay(5, () => {
					PlayerState.remove(EPlayerState.stunned);
				});
			}
		});
	}
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

		//* testing purposes
		if (RunService.IsStudio() || role === Roles.deer) {
			const c1 = PlayerState.onAdd((added) => {
				if (added === EPlayerState.stunned) {
					humanoid.WalkSpeed = 3;
					this.AnimationController.play("deerTrapHit", false);
				}
			});

			const c2 = PlayerState.onRemove((removed) => {
				if (removed === EPlayerState.stunned) {
					humanoid.WalkSpeed = 8;
				}
			});

			this.trove.add(() => {
				c1.clear();
				c2.clear();
			});
		}
	}
	deer(character: ICharacter) {
		character.Humanoid.WalkSpeed = 8;
	}
	wendigo(character: ICharacter) {
		character.Humanoid.WalkSpeed = 24;
		this.AnimationController.play("transformation");
	}
}
