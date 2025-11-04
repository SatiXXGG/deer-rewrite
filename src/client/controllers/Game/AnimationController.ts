import { Controller, OnStart } from "@flamework/core";
import Make from "@rbxts/make";
import { Players } from "@rbxts/services";
import { onCharacterAdded } from "client/modding/onCharacterAdded/interface";
import { ICharacter } from "shared/components/types/Character";

@Controller({})
export class AnimationController implements OnStart, onCharacterAdded {
	private AnimationInstances = new Map<string, Animation>();
	private LoadedInstances = new Map<string, AnimationTrack>();
	private hasAction: string[] = [];
	onStart() {}
	onCharacterAdded(character: ICharacter): void {
		this.LoadedInstances.forEach((loaded) => {
			loaded.Destroy();
		});

		this.LoadedInstances.clear();

		this.AnimationInstances.forEach((animation, name) => {
			const loaded = character.Humanoid.Animator.LoadAnimation(animation);
			this.LoadedInstances.set(name, loaded);
		});
	}
	/**
	 * Creates all the animations
	 * !Use once
	 * @param id
	 * @param name
	 */

	create(id: string, name: string) {
		const animation = Make("Animation", {
			AnimationId: id,
			Parent: Players.LocalPlayer,
			Name: name,
		});

		this.AnimationInstances.set(name, animation);
	}

	play(name: string, negate: boolean = false, action = false) {
		if (negate) {
			this.LoadedInstances.forEach((loaded, currentName) => {
				if (name !== currentName && !this.hasAction.includes(currentName)) {
					loaded.Stop();
				}
			});
		}
		const x = this.LoadedInstances.get(name);
		if (x?.IsPlaying) return;
		if (action && x) {
			this.hasAction.push(name);
			x.Ended.Once(() => {
				this.hasAction.remove(this.hasAction.indexOf(name));
			});
		}
		x?.Play();
	}

	stop(name: string) {
		this.LoadedInstances.get(name)?.Stop();
	}
}
