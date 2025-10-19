import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { ICharacter } from "shared/components/types/Character";
import { PathfindingService, PhysicsService, Workspace } from "@rbxts/services";
import Make from "@rbxts/make";

PhysicsService.RegisterCollisionGroup("deer");
PhysicsService.CollisionGroupSetCollidable("deer", "deer", false);

interface Attributes {}

const rad = math.random;

class PathFinding {
	private humanoid: Humanoid;
	private path: Path;
	public showWaypoints = false;
	constructor(humanoid: Humanoid, params?: AgentParameters) {
		this.humanoid = humanoid;
		this.path = PathfindingService.CreatePath(params);
	}

	private renderWaypoints(waypoint: PathWaypoint) {
		const part = new Instance("Part");
		part.Anchored = true;
		part.CanCollide = false;
		part.Position = waypoint.Position.add(new Vector3(0, 3, 0));
		part.Size = new Vector3(0.5, 0.5, 0.5);
		part.Shape = Enum.PartType.Ball;
		part.Material = Enum.Material.Neon;
		part.Parent = Workspace;
	}

	moveTo(goalPos: Vector3, startPosA?: Vector3) {
		const character = this.humanoid.FindFirstAncestorOfClass("Model");

		if (character) {
			const humanoidRoot = character.FindFirstChild("HumanoidRootPart") as BasePart;
			if (humanoidRoot) {
				const startPos = startPosA || humanoidRoot.Position;

				try {
					this.path.ComputeAsync(goalPos, startPos);
					const waypoints = this.path.GetWaypoints();
					if (waypoints) {
						for (let i = 0; i <= 3; i++) {
							const waypoint = waypoints[i];

							if (waypoint) {
								if (this.showWaypoints) {
									this.renderWaypoints(waypoint);
								}

								this.humanoid.MoveTo(waypoint.Position);
								this.humanoid.MoveToFinished.Wait();
							}
						}
					} else {
						//this.moveTo(goalPos);
					}
				} catch (e) {
					error(e);
				}
			}
		}
	}
}

@Component({
	tag: "deer",
})
export class Deer extends BaseComponent<Attributes, ICharacter> implements OnStart {
	private npc = this.instance;
	private max = math.random(20, 30);
	private loop = coroutine.create(() => {
		while (this.instance) {
			this.move();
			task.wait(math.random(5, 10));
		}
		coroutine.yield();
	});
	private path = new PathFinding(this.npc.Humanoid);

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
		task.delay(math.random(1, 3), () => {
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
		const randomN = math.random(0, 100);
		if (randomN < 50) {
			const eatAnimation = Make("Animation", {
				Parent: this.npc,
				Name: "eat",
				AnimationId: "rbxassetid://95470529033464",
			});

			const eatTrack = this.npc.Humanoid.Animator.LoadAnimation(eatAnimation);

			eatTrack.Play();
			eatTrack.Ended.Once(() => {
				eatTrack.Destroy();
				eatAnimation.Destroy();
			});

			return;
		}

		if (!this.npc.FindFirstChildOfClass("Humanoid")) return;
		this.path.moveTo(this.calcRandomPos());
	}
}
