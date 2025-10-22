import { Service, OnStart } from "@flamework/core";
import { MapService } from "./MapService";
import { CollectionService, Players, ReplicatedStorage, ServerStorage, Workspace } from "@rbxts/services";
import { ICharacter } from "shared/components/types/Character";
import { RoleArray, Roles } from "shared/types/RoleTags";
import { Trove } from "@rbxts/trove";
import { AvatarService } from "./AvatarService";
import { Events } from "server/network";
import { DataService } from "./DataService";
import getRole from "shared/utils/getRole";
import { Settings } from "shared/data/GameSettings";
import Make from "@rbxts/make";
@Service({})
export class SpawnService implements OnStart {
	constructor(
		private MapService: MapService,
		private AvatarService: AvatarService,
		private DataService: DataService,
	) {}
	onStart() {
		Events.gameplay.attack.connect((player) => {
			const character = player.Character as ICharacter | undefined;
			if (getRole(player) === Roles.wendigo && character) {
				const cooldown = player.GetAttribute("ac") as boolean | undefined;
				if (cooldown) return;
				player.SetAttribute("cooldown", true);
				//* kill logic
				const players = CollectionService.GetTagged(Roles.hunter) as Player[];

				players.forEach((target) => {
					const targetCharacter = target.Character as ICharacter | undefined;
					if (targetCharacter && targetCharacter.Humanoid.Health > 0) {
						const distance = targetCharacter.HumanoidRootPart.Position.sub(
							character.HumanoidRootPart.Position,
						).Magnitude;
						if (distance <= Settings.wendigo.attackDistance) {
							targetCharacter.Humanoid.Health -= Settings.wendigo.attackDamage;
						}
					}
				});

				const sound = Make("Sound", {
					SoundId: "rbxassetid://6241709963",
					Name: "sfx",
					Parent: character.HumanoidRootPart,
					RollOffMaxDistance: 80,

					PlayOnRemove: true,
				});
				sound.Destroy();

				task.delay(0.2, () => {
					player.SetAttribute("cooldown", false);
				});
			}
		});
	}
	spawnMushroom() {
		if (this.MapService.currentMap) {
			print("🍄");
			const validMaterials: Enum.Material[] = [Enum.Material.Grass, Enum.Material.Sand];
			const ray = this.MapService.getSpawnPosition((result) => {
				return validMaterials.includes(result.Instance.Material);
			});
			if (ray) {
				const mushroomModel = ServerStorage.assets.mushroom.Clone();
				mushroomModel.SetAttribute("usable", true);
				mushroomModel.PivotTo(
					new CFrame(ray.Position, ray.Position.add(ray.Normal)).mul(CFrame.Angles(math.rad(-90), 0, 0)),
				);
				mushroomModel.ScaleTo(math.random(1, 1.5));
				mushroomModel.Parent = this.MapService.currentMap;
				mushroomModel.AddTag("mushroom");
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
				skin.AddTag("deer");
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
				player.RemoveTag("playing");
				trove.clean();
			});

			trove.connect(character.Humanoid.Died, () => {
				player.RemoveTag(role);
				player.RemoveTag("playing");
				trove.clean();
			});
		} else {
			warn("Character not found for: ", player);
		}
	}

	spawnHunter(player: Player) {
		player.AddTag(Roles.hunter);
		player.AddTag(Roles.playing);
		player.AddTag("playing");
		const spawn = this.MapService.getHunterSpawn();
		const character = player.Character as ICharacter | undefined;
		if (spawn && character) {
			print("🏹 Hunter spawned");
			character.HumanoidRootPart.CFrame = spawn.CFrame;
			this.autoRemoveTags(player, Roles.hunter);
			player.SetAttribute("traps", 3);
			/** bow */
			const profile = this.DataService.getProfile(player);

			if (profile) {
				const skin = ReplicatedStorage.skins.bow.FindFirstChild(profile.Data.currentBow);
				if (skin !== undefined) {
					const bow = skin.Clone();
					bow.Parent = player.Backpack;
				}
			}
		}
	}

	cleanTags(player: Player) {
		RoleArray.forEach((role) => {
			player.RemoveTag(role);
		});
	}

	spawnUser(player: Player) {
		this.cleanTags(player);
		player.AddTag(Roles.playing);
		player.AddTag(Roles.deer);
		player.AddTag("playing");
		const character = this.AvatarService.changeDeer(player);
		if (character) {
			//* moves to the spawn
			const spawn = this.MapService.getSpawn();
			if (spawn) {
				character.HumanoidRootPart.CFrame = spawn.CFrame;
				this.bindHunger(player, character);
			}
			//* tag removal
		}
	}

	spawnWendigo(player: Player) {
		const cc = player.Character as ICharacter | undefined;
		player.AddTag(Roles.playing);
		player.AddTag(Roles.wendigo);
		if (cc) {
			const currentPosition = cc.HumanoidRootPart.CFrame;
			const character = this.AvatarService.changeWendigo(player);
			if (character) {
				//* moves to the spawn
				print("🧟 Wendigo spawned");

				character.HumanoidRootPart.CFrame = currentPosition;
				this.autoRemoveTags(player, Roles.wendigo);
				this.autoRemoveTags(player, Roles.deer);
				this.autoRemoveTags(player, Roles.playing);
			}
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
		return CollectionService.GetTagged(Roles.deer) as Player[];
	}

	getWendigo() {
		return CollectionService.GetTagged(Roles.wendigo) as Player[];
	}

	bindHunger(player: Player, character: ICharacter) {
		//* Resets
		player.SetAttribute("Hunger", 1500);
		/** Hunger handling */
		const loop = coroutine.create(() => {
			while (character && character.FindFirstChildOfClass("Humanoid")) {
				const currentHunger = player.GetAttribute("Hunger") as number;
				if (currentHunger > 0) {
					player.SetAttribute("Hunger", math.clamp(currentHunger - 1, 0, 1500));
				}
				task.wait();
			}
			coroutine.yield();
			coroutine.close(loop);
		});
		coroutine.resume(loop);
	}
}
