import { Service, OnStart } from "@flamework/core";
import { EntityService } from "./EntityService";
import { Events } from "server/network";
import { GetInfoByClass, IBowInfo } from "shared/data/Skins";
import { EItemClass } from "shared/types/GameItem";
import { onPlayerJoined } from "server/modding/onPlayerJoined/interface";
import { Players } from "@rbxts/services";

interface IToolInstance extends Tool {
	Handle: BasePart;
}

interface IBowInstance extends IToolInstance {
	Handle: BasePart & {
		firePos: Attachment;
	};
}

/**
 * task.spawn(() => {
			player.SetAttribute("arrows", 3);
			player.SetAttribute("lastArrowTick", tick());
			while (this.tool) {
				const lastArrowTick = player.GetAttribute("lastArrowTick") as number;
				const currentArrows = player.GetAttribute("arrows") as number;
				if (tick() - lastArrowTick > 1 && currentArrows < 3) {
					player.SetAttribute("arrows", (player.GetAttribute("arrows") as number) + 1);
					player.SetAttribute("lastArrowTick", tick());
				} else {
					if (currentArrows >= 3) {
						player.SetAttribute("lastArrowTick", tick());
					}
				}
				task.wait();
			}
			coroutine.yield();
		});
 */
@Service({})
export class ToolService implements OnStart, onPlayerJoined {
	constructor(private EntityService: EntityService) {}
	onStart() {
		Events.bow.shot.connect((player, hit) => {
			if (player.Character && ((player.GetAttribute("arrows") as number) ?? 0) > 0) {
				const tool = this.getTool<IBowInstance>(player, "bow");
				if (tool) {
					const info = GetInfoByClass<IBowInfo>(EItemClass.bow, tool.Name);
					assert(info, "No info for bow: " + tool.Name);
					const origin = tool.Handle.firePos.WorldPosition;
					this.EntityService.arrow(player, hit, origin, info);
					player.SetAttribute("arrows", (player.GetAttribute("arrows") as number) - 1);
				}
			}
		});
	}
	getTool<T extends IToolInstance>(player: Player, Class: string) {
		const found = player.Character!.GetChildren().find((instance) => {
			if (instance.IsA("Tool") && instance.GetAttribute("class") === Class) {
				return true;
			}
		}) as T | undefined;
		return found;
	}
	setup(tool: IToolInstance, player: Player, Class: string) {
		if (Class === "bow") {
			print("Server 🏹 Setup");
			task.spawn(() => {
				player.SetAttribute("arrows", 3);
				player.SetAttribute("lastArrowTick", tick());
				while (tool && player.IsDescendantOf(Players)) {
					const lastArrowTick = player.GetAttribute("lastArrowTick") as number;
					const currentArrows = player.GetAttribute("arrows") as number;
					if (tick() - lastArrowTick > 3 && currentArrows < 3) {
						player.SetAttribute("arrows", (player.GetAttribute("arrows") as number) + 1);
						player.SetAttribute("lastArrowTick", tick());
					} else {
						if (currentArrows >= 3) {
							player.SetAttribute("lastArrowTick", tick());
						}
					}
					task.wait();
				}
				coroutine.yield();
			});
		}
	}

	onJoin(Player: Player): void {
		task.delay(1, () => {
			const backpack = Player.Backpack;
			backpack.ChildAdded.Connect((tool) => {
				if (
					tool.IsA("Tool") &&
					tool.GetAttribute("class") !== undefined &&
					tool.GetAttribute("ss") === undefined
				) {
					this.setup(tool as IToolInstance, Player, tool.GetAttribute("class") as string);
					tool.SetAttribute("ss", true);
				}
			});

			backpack.GetChildren().forEach((tool) => {
				if (
					tool.IsA("Tool") &&
					tool.GetAttribute("class") !== undefined &&
					tool.GetAttribute("ss") === undefined
				) {
					this.setup(tool as IToolInstance, Player, tool.GetAttribute("class") as string);
					tool.SetAttribute("ss", true);
				}
			});
		});

		Player.CharacterAdded.Connect(() => {
			task.delay(1, () => {
				const backpack = Player.Backpack;
				backpack.ChildAdded.Connect((tool) => {
					if (
						tool.IsA("Tool") &&
						tool.GetAttribute("class") !== undefined &&
						tool.GetAttribute("ss") === undefined
					) {
						this.setup(tool as IToolInstance, Player, tool.GetAttribute("class") as string);
						tool.SetAttribute("ss", true);
					}
				});

				backpack.GetChildren().forEach((tool) => {
					if (
						tool.IsA("Tool") &&
						tool.GetAttribute("class") !== undefined &&
						tool.GetAttribute("ss") === undefined
					) {
						this.setup(tool as IToolInstance, Player, tool.GetAttribute("class") as string);
						tool.SetAttribute("ss", true);
					}
				});
			});
		});
	}
}
