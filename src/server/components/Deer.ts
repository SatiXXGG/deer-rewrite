import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { ICharacter } from "shared/components/types/Character";
import { PhysicsService, Workspace } from "@rbxts/services";
import Make from "@rbxts/make";

PhysicsService.RegisterCollisionGroup("deer");
PhysicsService.CollisionGroupSetCollidable("deer", "deer", false);

interface Attributes {}

const rad = math.random;
@Component({
	tag: "deer",
})
export class Deer extends BaseComponent<Attributes, ICharacter> implements OnStart {
	private npc = this.instance;
	private max = math.random(20, 30);
	private loop = coroutine.create(() => {
		while (this.instance) {
			this.move();
			task.wait(math.random(5, 30));
		}
		coroutine.yield();
	});
	onStart() {
		this.npc.WaitForChild("Humanoid", 2);
		assert(this.npc.Humanoid, "No humanoid");
		const idleAnimation = Make("Animation", {
			Parent: this.npc,
			Name: "Idle",
			AnimationId: "rbxassetid://78646183339693",
		});

		const walkAnimation = Make("Animation", {
			Parent: this.npc,
			Name: "Walk",
			AnimationId: "rbxassetid://125899269116814",
		});

		const idleTrack = this.npc.Humanoid.Animator.LoadAnimation(idleAnimation);
		const walkTrack = this.npc.Humanoid.Animator.LoadAnimation(walkAnimation);
		idleTrack.Play();
		const moveConn = this.npc.Humanoid.Running.Connect((speed) => {
			if (speed < 1) {
				idleTrack.Play();
				walkTrack.Stop();
			} else {
				idleTrack.Stop();
				walkTrack.Play();
			}
		});

		this.instance.Destroying.Connect(() => {
			super.destroy();
			moveConn.Disconnect();
		});

		//* collision handling
		this.npc.GetDescendants().forEach((descendant) => {
			if (descendant.IsA("BasePart")) {
				descendant.CollisionGroup = "deer";
			}
		});
		task.delay(5, () => {
			print("loop resumed");
			coroutine.resume(this.loop);
		});
	}

	calcRandomPos() {
		let result: Vector3 | undefined = undefined;

		while (result === undefined) {
			const randomPos = this.npc.HumanoidRootPart.Position.add(
				new Vector3(rad(-this.max, this.max), this.npc.HumanoidRootPart.Position.Y, rad(-this.max, this.max)),
			);
			const params = new RaycastParams();
			params.FilterDescendantsInstances = [this.npc];
			const ray = Workspace.Raycast(randomPos, new Vector3(0, -99, 0), params);
			if (ray && ray.Material === Enum.Material.Grass) {
				result = ray.Position;
			}
			task.wait();
		}

		return result;
	}

	move() {
		if (!this.npc.FindFirstChildOfClass("Humanoid")) return;
		this.npc.Humanoid.MoveTo(this.calcRandomPos());
	}
}
