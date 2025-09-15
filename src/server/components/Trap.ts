import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { Players, TweenService } from "@rbxts/services";
import { Events } from "server/network";
import Make from "@rbxts/make";

interface Attributes {}

export interface ITrap extends Model {
	hitbox: BasePart;
	ho: BasePart;
	ht: BasePart;
}

@Component({
	tag: "trap",
})
export class Trap extends BaseComponent<Attributes, ITrap> implements OnStart {
	private used = false;
	onStart() {
		this.instance.Destroying.Connect(() => {
			super.destroy();
		});

		//* trap setup
		this.instance.ht.Anchored = true;
		this.instance.ho.Anchored = true;

		this.instance.hitbox.GetChildren().forEach((child) => {
			if (child.IsA("WeldConstraint")) {
				child.Destroy();
			}
		});

		task.wait(3);

		this.instance.hitbox.Touched.Connect((hit) => {
			if (this.used) return;
			const model = hit.FindFirstAncestorOfClass("Model");
			if (model) {
				const humanoid = model.FindFirstChildOfClass("Humanoid");
				const player = Players.GetPlayerFromCharacter(model);

				if (player && humanoid) {
					this.used = true;
					const highlight = Make("Highlight", {
						Parent: model,
					});
					const loop = coroutine.create(() => {
						while (this.instance) {
							Events.trap.set(player);
							task.wait();
						}
						coroutine.yield();
					});
					print("Player hit by trap ⚠️");
					coroutine.resume(loop);

					const ti = new TweenInfo(0.5, Enum.EasingStyle.Elastic);
					const t1 = TweenService.Create(this.instance.ho, ti, {
						CFrame: this.instance.ho.CFrame.mul(CFrame.Angles(math.rad(-80), 0, 0)),
					});

					const t2 = TweenService.Create(this.instance.ht, ti, {
						CFrame: this.instance.ht.CFrame.mul(CFrame.Angles(math.rad(-80), 0, 0)),
					});

					t1.Play();
					t2.Play();

					task.delay(5, () => {
						this.instance.Destroy();
						super.destroy();
						highlight.Destroy();
						coroutine.close(loop);
						t1.Destroy();
						t2.Destroy();
					});
				}
			}
		});
	}
}
