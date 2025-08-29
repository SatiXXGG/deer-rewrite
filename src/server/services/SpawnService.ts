import { Service, OnStart } from "@flamework/core";
import { MapService } from "./MapService";
import { CollectionService, Players, ReplicatedStorage, ServerStorage } from "@rbxts/services";
import { ICharacter } from "shared/components/types/Character";
import { RoleArray, Roles } from "shared/types/RoleTags";
import { Trove } from "@rbxts/trove";
import { AvatarService } from "./AvatarService";

@Service({})
export class SpawnService implements OnStart {
	constructor(private MapService: MapService, private AvatarService: AvatarService) {}
	onStart() {}
	spawnMushroom() {
		if (this.MapService.currentMap) {
			print("🍄");
			const validMaterials: Enum.Material[] = [Enum.Material.Grass, Enum.Material.Sand];
			const ray = this.MapService.getSpawnPosition((result) => {
				return validMaterials.includes(result.Instance.Material);
			});
			if (ray) {
				const mushroomModel = ServerStorage.assets.mushroom.Clone();
				mushroomModel.PivotTo(
					new CFrame(ray.Position, ray.Position.add(ray.Normal)).mul(CFrame.Angles(math.rad(-90), 0, 0)),
				);
				mushroomModel.ScaleTo(math.random(1, 1.5));
				mushroomModel.Parent = this.MapService.currentMap;
			}
		} else {
			warn("Attempt to spawn mushroom without any map");
		}
	}
	spawnDeer() {
		if (this.MapService.currentMap) {
			print("🦌");
			const validMaterials: Enum.Material[] = [Enum.Material.Grass, Enum.Material.Sand];
			const ray = this.MapService.getSpawnPosition((result) => {
				return validMaterials.includes(result.Instance.Material);
			});

			if (ray) {
				const skin = ReplicatedStorage.skins.deer.default.Clone() as ICharacter;
				skin.Parent = this.MapService.currentMap!;
				skin.HumanoidRootPart.CFrame = new CFrame(ray.Position.add(new Vector3(0, 5, 0)));
			}
		}
	}

	autoRemoveTags(player: Player, role: Roles) {
		const character = player.Character as ICharacter | undefined;
		const trove = new Trove();
		if (character) {
			trove.connect(character.Destroying, () => {
				player.RemoveTag(role);
				trove.clean();
			});

			trove.connect(character.Humanoid.Died, () => {
				player.RemoveTag(role);
				trove.clean();
			});
		} else {
			warn("Character not found for: ", player);
		}
	}

	spawnHunter(player: Player) {
		player.AddTag(Roles.hunter);
		player.AddTag(Roles.playing);
		const spawn = this.MapService.getHunterSpawn();
		const character = player.Character as ICharacter | undefined;
		if (spawn && character) {
			print("🏹 Hunter spawned");
			character.HumanoidRootPart.CFrame = spawn.CFrame;
			this.autoRemoveTags(player, Roles.hunter);
		}
	}

	spawnUser(player: Player) {
		const character = this.AvatarService.changeDeer(player);
		if (character) {
			//* moves to the spawn
			const spawn = this.MapService.getSpawn();
			if (spawn) {
				print("🧖🏻‍♂️ User spawned");
				player.AddTag(Roles.playing);
				player.AddTag(Roles.deer);
				character.HumanoidRootPart.CFrame = spawn.CFrame;
				this.autoRemoveTags(player, Roles.deer);
			}
			//* tag removal
		}
	}

	getRole(role: Roles) {
		const tagged = CollectionService.GetTagged(role).filter((obj) => {
			if (obj.IsA("Player")) {
				return obj.GetTags().some((tag) => tag === role);
			}
			return false;
		});

		return tagged;
	}

	resetAll() {
		Players.GetPlayers().forEach((player) => {
			const character = player.Character as ICharacter | undefined;
			if (character && player.GetTags().includes("playing")) {
				character.Humanoid.Health = 0;
				RoleArray.forEach((role) => {
					player.RemoveTag(role);
				});
			}
		});
	}

	getPlayers() {
		return CollectionService.GetTagged("player");
	}
}
