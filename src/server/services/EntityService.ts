import { OnStart, Service } from "@flamework/core";
import FastCast from "@rbxts/fastcast";
import Make from "@rbxts/make";
import { Players, ReplicatedStorage, ServerStorage, Workspace } from "@rbxts/services";
import { Events } from "server/network";
import { ICharacter, IDeerSkin } from "shared/components/types/Character";
import { IBowInfo } from "shared/data/Skins";
import { Roles } from "shared/types/RoleTags";
import getRole from "shared/utils/getRole";
import { isPlayer } from "shared/utils/isPlayer";
import { DataService } from "./DataService";
import { MapService } from "./MapService";
import { ITrap } from "server/components/Trap";

@Service({})
export class EntityService implements OnStart {
	private arrowsContainer = Make("Folder", {
		Name: "Arrows container",
		Parent: Workspace,
	});
	constructor(private DataService: DataService, private MapService: MapService) {}

	onStart() {
		Events.gameplay.eat.connect((player, mushroom) => {
			const character = player.Character as ICharacter | undefined;
			if (character && mushroom && player.GetTags().includes(Roles.deer)) {
				const distance = character.HumanoidRootPart.Position.sub(mushroom.GetPivot().Position).Magnitude;
				if (distance < 17) {
					const currentHunger = (player.GetAttribute("Hunger") as number | undefined) ?? 0;
					mushroom.Destroy();
					player.SetAttribute("Hunger", math.clamp(currentHunger + 1000, 0, 1000));
					//TODO: ADD SFX
				}
			}
		});

		Events.gameplay.taunt.connect((player) => {
			const character = player.Character as IDeerSkin | undefined;
			if (character && getRole(player) === Roles.deer) {
				const profile = this.DataService.getProfile(player);
				const currentTaunt = profile.Data.currentTaunt;
				let taunt = ReplicatedStorage.skins.taunt.FindFirstChild(currentTaunt) as ParticleEmitter | undefined;
				if (taunt) {
					taunt = taunt.Clone();
					//* setup
					taunt.Parent = character.taunt;
					//* emission
					taunt.Emit(25);
				}
			} else if (character && getRole(player) === Roles.wendigo) {
				print("Wendigo scream");
			}
		});
		Events.gameplay.trap.connect((player) => {
			this.trap(player);
		});
	}
	/**
	 * Spawns an arrow in the world
	 * @param player
	 * @param hit
	 * @param origin
	 * @param bowInfo
	 * @returns
	 */
	arrow(player: Player, hit: Vector3, origin: Vector3, bowInfo: IBowInfo) {
		if (!player.Character) return;
		const arrowType = bowInfo.arrow;
		const force = bowInfo.force;
		const arrowModel = ReplicatedStorage.skins.arrow.FindFirstChild(arrowType) as Model | undefined;
		const caster = new FastCast();
		const params = new RaycastParams();
		const info = FastCast.newBehavior();
		assert(arrowModel, "No arrow model of id: " + arrowType);
		params.FilterDescendantsInstances = [player.Character!];
		info.RaycastParams = params;
		info.Acceleration = new Vector3(0, -Workspace.Gravity, 0);
		info.AutoIgnoreContainer = false;
		info.CosmeticBulletContainer = this.arrowsContainer;
		info.CosmeticBulletTemplate = arrowModel;

		caster.LengthChanged.Connect((activeCast, last, dir, displacement, segmentVelocity, cosmeticBullet) => {
			const newPos = last.add(dir.mul(displacement));
			(cosmeticBullet as BasePart).CFrame = CFrame.lookAt(last, newPos);
		});

		caster.RayHit.Connect((_, ray, sv, bullet) => {
			const hit = ray.Instance;
			const character = hit.FindFirstAncestorWhichIsA("Model") as ICharacter | undefined;
			if (character && character.FindFirstChildOfClass("Humanoid")) {
				const player = Players.GetPlayerFromCharacter(character);
				if ((player && getRole(player) === Roles.deer) || !player) {
					character.Humanoid.TakeDamage(99999);
					bullet?.Destroy();
					task.wait();
					character.Destroy();
				}
			}

			task.delay(1, () => {
				bullet?.Destroy();
			});
		});

		caster.Fire(origin, hit.sub(origin), force, info);
	}
	/**
	 * Method for spawning traps
	 * @param player
	 */
	trap(player: Player) {
		const role = getRole(player);
		const currentTraps = player.GetAttribute("traps") as number | undefined;
		const character = player.Character as ICharacter | undefined;
		print(
			this.MapService.currentMap,
			character,
			role === Roles.hunter,
			currentTraps !== undefined,
			currentTraps ?? 0 > 0,
		);
		if (
			this.MapService.currentMap &&
			character &&
			role === Roles.hunter &&
			currentTraps !== undefined &&
			currentTraps > 0
		) {
			/** trap spawn logic */
			const start = character.HumanoidRootPart.CFrame.mul(new CFrame(0, 0, -3)).Position;
			const direction = new Vector3(0, -1000, 0);
			const params = new RaycastParams();
			params.FilterDescendantsInstances = [character];
			const ray = Workspace.Raycast(start, direction, params);
			if (ray) {
				//* Animation & Sfx?
				const trapModel = ServerStorage.assets.trap.Clone() as ITrap;
				trapModel.Parent = character;
				trapModel.hitbox.Anchored = false;

				const motor = Make("Motor6D", {
					Parent: character.HumanoidRootPart,
					Part0: character.HumanoidRootPart,
					Part1: trapModel.PrimaryPart,
				});

				const anim = Make("Animation", {
					AnimationId: "rbxassetid://101938387958042",
					Parent: trapModel,
				});

				const loaded = character.Humanoid.Animator.LoadAnimation(anim);
				const c = loaded.Ended.Connect(() => {
					motor.Destroy();
					trapModel.Destroy();
					loaded.Destroy();
					c.Disconnect();
					//* trap placing
					player.SetAttribute("traps", currentTraps - 1);
					const trap = ServerStorage.assets.trap.Clone();
					trap.PivotTo(
						new CFrame(ray.Position, ray.Position.add(ray.Normal)).mul(CFrame.Angles(math.rad(-90), 0, 0)),
					);
					trap.Parent = this.MapService.currentMap;
					trap.AddTag("trap");
				});
				loaded.Play();
			}
		}
	}
}
