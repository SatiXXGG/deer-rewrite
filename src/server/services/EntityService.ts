import { Service, OnStart } from "@flamework/core";
import FastCast, { Caster, FastCastBehavior } from "@rbxts/fastcast";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { Events } from "server/network";
import { ICharacter, IDeerSkin } from "shared/components/types/Character";
import { Roles } from "shared/types/RoleTags";
import { DataService } from "./DataService";
import getRole from "shared/utils/getRole";
import { isPlayer } from "shared/utils/isPlayer";
import Make from "@rbxts/make";
import { EArrowType, IBowInfo } from "shared/data/Skins";

@Service({})
export class EntityService implements OnStart {
	private arrowsContainer = Make("Folder", {
		Name: "Arrows container",
		Parent: Workspace,
	});
	constructor(private DataService: DataService) {}

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
	}
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

		caster.RayHit.Connect((_, ray) => {
			const hit = ray.Instance;
			const character = isPlayer(hit, Roles.deer);
			if (character) {
				character.Humanoid.TakeDamage(100000);
			}
		});

		caster.Fire(origin, hit, force, info);
	}
}
