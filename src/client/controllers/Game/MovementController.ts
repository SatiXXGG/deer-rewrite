import { Controller, OnStart } from "@flamework/core";
import Make from "@rbxts/make";
import { Players } from "@rbxts/services";
import { Trove } from "@rbxts/trove";
import { onCharacterAdded } from "client/modding/onCharacterAdded/interface";
import { ICharacter } from "shared/components/types/Character";
import { DeerAnimations, WendigoAnimations } from "shared/data/Animations";
import { Roles } from "shared/types/RoleTags";
import getRole from "shared/utils/getRole";

function animate(humanoid: ICharacter["Humanoid"], id: string) {
	const anim = Make("Animation", {
		AnimationId: id,
		Parent: humanoid,
	});

	return humanoid.Animator.LoadAnimation(anim);
}

@Controller({})
export class MovementController implements OnStart, onCharacterAdded {
	private player = Players.LocalPlayer;
	private trove = new Trove();
	private roleCalls: { [key in Roles]?: (character: ICharacter) => void } = {
		[Roles.deer]: (character: ICharacter) => this.deer(character),
		[Roles.wendigo]: (character: ICharacter) => this.wendigo(character),
	};
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
		const anims = role === Roles.deer ? DeerAnimations : WendigoAnimations;
		const humanoid = character.Humanoid;
		const idle = animate(humanoid, anims.idle);
		const walk = animate(humanoid, anims.walk);
		const run = animate(humanoid, anims.run);

		let isWalking = false;
		let isRunning = false;
		this.trove.connect(humanoid.Running, (speed) => {
			if (speed < 1) {
				idle.Play();
				walk.Stop();
				run.Stop();
				isWalking = false;
				isRunning = false;
			} else if (speed < 16 && !isWalking) {
				walk.Play();
				idle.Stop();
				run.Stop();
				isWalking = true;
				isRunning = false;
			} else if (speed > 16 && !isRunning) {
				run.Play();
				idle.Stop();
				walk.Stop();
				isWalking = false;
				isRunning = true;
			}
		});
	}
	deer(character: ICharacter) {
		character.Humanoid.WalkSpeed = 16;
	}
	wendigo(character: ICharacter) {
		character.Humanoid.WalkSpeed = 20;
		const transform = animate(character.Humanoid, WendigoAnimations.transformation);
		transform.Play();
	}
}
