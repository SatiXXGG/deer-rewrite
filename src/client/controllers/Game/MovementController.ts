import { Controller, OnStart } from "@flamework/core";
import { Players, RunService } from "@rbxts/services";
import { Trove } from "@rbxts/trove";
import { onCharacterAdded } from "client/modding/onCharacterAdded/interface";
import { ICharacter } from "shared/components/types/Character";
import { Roles } from "shared/types/RoleTags";
import getRole from "shared/utils/getRole";
import { AnimationController } from "./AnimationController";
import { EPlayerState, PlayerState } from "../data/State";
import { Events } from "client/network";
import { EItemClass } from "shared/types/GameItem";
import { BowSkinsInfo } from "shared/data/Skins";

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

		for (const [index, info] of pairs(BowSkinsInfo)) {
			this.AnimationController.create(info.walk, "walk" + info.id);
			this.AnimationController.create(info.idle, "idle" + info.id);
			this.AnimationController.create(info.fire, "fire" + info.id);
		}
	}

	hasBow(character: ICharacter) {
		let has: string | undefined = undefined;
		character.GetChildren().forEach((child) => {
			if (child.GetAttribute("class") === EItemClass.bow && child.IsA("Tool")) {
				has = child.Name;
			}
		});
		return has;
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
			const hasBow = this.hasBow(character);
			if (speed < 1) {
				if (!hasBow) {
					this.AnimationController.play("idle" + anims, true);
				} else {
					this.AnimationController.play("idle" + hasBow, true);
				}
			} else if (speed < 16) {
				if (!hasBow) {
					if (PlayerState.listHasState(EPlayerState.hungry)) {
						this.AnimationController.play("run" + anims, true);
					} else {
						this.AnimationController.play("walk" + anims, true);
					}
				} else {
					if (PlayerState.listHasState(EPlayerState.hungry)) {
						this.AnimationController.play("walk" + hasBow, true);
					} else {
						this.AnimationController.play("walk" + hasBow, true);
					}
				}
			} else if (speed > 20) {
				if (!hasBow) {
					this.AnimationController.play("run" + anims, true);
				} else {
					this.AnimationController.play("run" + hasBow, true);
				}
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
		Events.gameplay.taunt.fire();
	}
}
