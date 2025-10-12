import { Service, OnStart } from "@flamework/core";
import { MapModel } from "./VotingService";
import { CollectionService, Players, ServerStorage, TweenService, Workspace } from "@rbxts/services";
import { ICharacter } from "shared/components/types/Character";
import { Roles } from "shared/types/RoleTags";
import { Rounds, RoundService } from "./RoundService";

interface IHunterSpawn extends BasePart {
	spawn: BasePart;
}
interface ICabin extends Model {
	hinge: BasePart;
}

@Service({})
export class MapService implements OnStart {
	public currentMap: MapModel | undefined = undefined;
	private rayDirection = new Vector3(0, -1000, 0);
	constructor(private RoundService: RoundService) {}
	onStart() {
		// cabin opening
		this.RoundService.onChange((round) => {
			print(round === Rounds.OnRound, this.currentMap);
			if (round === Rounds.OnRound && this.currentMap !== undefined) {
				const childrens = this.currentMap.GetDescendants();
				const tweenInfo = new TweenInfo(0.5, Enum.EasingStyle.Linear, Enum.EasingDirection.Out, 0, false, 0);
				childrens.forEach((children) => {
					if (children.GetTags().includes("cabin")) {
						const cabin = children as ICabin;
						const tween = TweenService.Create(cabin.hinge, tweenInfo, {
							CFrame: cabin.hinge.CFrame.mul(CFrame.Angles(0, math.rad(-100), 0)),
						});
						tween.Play();
						tween.Completed.Once(() => {
							tween.Destroy();
						});
					}
				});
			}
		});
	}
	getSpawn() {
		if (this.currentMap) {
			const random = this.getRandomFromFolder(this.currentMap.npcSpawns);
			return random as BasePart;
		}
	}
	getHunterSpawn() {
		if (this.currentMap) {
			const random = this.getRandomFromFolder(this.currentMap.hunterSpawns);
			return random as BasePart;
		}
	}
	getRandomFromFolder(folder: Instance) {
		const childs = folder.GetChildren();
		return childs[math.random(0, childs.size() - 1)];
	}
	loadMap(map: string) {
		this.clearMap();
		const mapModel = ServerStorage.maps.FindFirstChild(map) as MapModel | undefined;
		assert(mapModel, "Missing map: " + map);
		if (mapModel) {
			this.currentMap = mapModel.Clone();
			this.setupMap(this.currentMap);
		}
	}
	setupMap(mapModel: MapModel) {
		mapModel.Parent = Workspace;
		this.setWinning(mapModel);
	}
	clearMap() {
		if (this.currentMap) {
			this.currentMap.Destroy();
		}
	}
	setWinning(map: MapModel) {
		const hunterWinning = map.hunterSpawns.GetChildren() as IHunterSpawn[];
		hunterWinning.forEach((spawn) => {
			spawn.Touched.Connect((hit) => {
				const character = hit.FindFirstAncestorOfClass("Model") as ICharacter | undefined;
				if (
					character &&
					character.FindFirstChildOfClass("Humanoid") &&
					Players.GetPlayerFromCharacter(character) &&
					this.RoundService.get() === Rounds.Survive
				) {
					const player = Players.GetPlayerFromCharacter(character)!;
					if (
						player &&
						player.GetTags().includes(Roles.hunter) &&
						this.RoundService.get() === Rounds.Survive &&
						character.Humanoid.Health > 0
					) {
						player.AddTag(Roles.safeHunter);
						const safeHunters = CollectionService.GetTagged(Roles.safeHunter).size();
						const currentHunters = CollectionService.GetTagged(Roles.hunter).size();
						if (safeHunters === currentHunters) {
							this.RoundService.win(Roles.hunter);
						}
					}
				}
			});
		});
	}
	highlightWinning() {
		const hunterWinning = this.currentMap?.hunterSpawns.GetChildren() as IHunterSpawn[];
		hunterWinning.forEach((spawn) => {
			const escape = new Instance("BillboardGui");
			escape.Name = "escape";
			escape.Active = true;
			escape.AlwaysOnTop = true;
			escape.ClipsDescendants = true;
			escape.LightInfluence = 1;
			escape.Size = UDim2.fromOffset(50, 50);
			escape.ZIndexBehavior = Enum.ZIndexBehavior.Sibling;

			const icon = new Instance("ImageLabel");
			icon.Name = "icon";
			icon.BackgroundTransparency = 1;
			icon.Image = "rbxassetid://73632563591958";
			icon.Size = UDim2.fromScale(1, 1);
			icon.Parent = escape;
			escape.Parent = spawn;
		});
	}
	getRandomPoint() {
		if (this.currentMap) {
			const size = this.currentMap.spawnZone.Size;
			const halfX = size.X / 2;
			const halfZ = size.Z / 2;
			const minX = this.currentMap.spawnZone.Position.X - halfX;
			const maxX = this.currentMap.spawnZone.Position.X + halfX;
			const minZ = this.currentMap.spawnZone.Position.Z - halfZ;
			const maxZ = this.currentMap.spawnZone.Position.Z + halfZ;
			return new Vector3(math.random(minX, maxX), this.currentMap.spawnZone.Position.Y, math.random(minZ, maxZ));
		}
	}
	getSpawnPosition(valid: (result: RaycastResult) => boolean = () => true) {
		if (this.currentMap) {
			let rayResult: RaycastResult | undefined;

			while (!rayResult) {
				const randomPoint = this.getRandomPoint();
				if (randomPoint) {
					const params = new RaycastParams();
					params.FilterDescendantsInstances = [this.currentMap.spawnZone, this.currentMap.hunterSpawns];
					const raycast = Workspace.Raycast(randomPoint, this.rayDirection, params);
					if (raycast && valid(raycast)) {
						rayResult = raycast;
					}
				}
			}

			return rayResult;
		}
	}
}
