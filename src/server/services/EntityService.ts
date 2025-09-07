import { Service, OnStart } from "@flamework/core";
import FastCast, { Caster, FastCastBehavior } from "@rbxts/fastcast";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { Events } from "server/network";
import { ICharacter, IDeerSkin } from "shared/components/types/Character";
import { Roles } from "shared/types/RoleTags";
import { DataService } from "./DataService";
import getRole from "shared/utils/getRole";

FastCast.VisualizeCasts = true;
@Service({})
export class EntityService implements OnStart {
	private casters = new Map<Player, Caster>();
	private behaviors = new Map<Player, FastCastBehavior>();

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
			}
		});
	}
	arrow(player: Player, hit: Vector3, origin: Vector3) {
		if (player.Character!) return;
		let caster = this.casters.get(player);
		if (!caster) {
			const params = new RaycastParams();
			params.FilterDescendantsInstances = [player.Character!];
			const info = FastCast.newBehavior();
			info.RaycastParams = params;
			info.Acceleration = new Vector3(0, -Workspace.Gravity, 0);
			info.AutoIgnoreContainer = false;

			const newCaster = new FastCast();
			this.casters.set(player, newCaster);
			caster = newCaster;
			this.behaviors.set(player, info);
		}
		const info = this.behaviors.get(player)!;
		caster.Fire(origin, hit, 10, info);
	}
}
