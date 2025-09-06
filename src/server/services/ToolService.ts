import { Service, OnStart } from "@flamework/core";
import { EntityService } from "./EntityService";
import { Events } from "server/network";

@Service({})
export class ToolService implements OnStart {
	constructor(private EntityService: EntityService) {}
	onStart() {
		Events.bow.shot.connect((player, hit) => {
			if (player.Character) {
				let bow: Tool | undefined;
				player.Character.GetChildren().forEach((child) => {
					if (child.IsA("Tool") && child.GetAttribute("class") === "bow") {
						const origin = child.GetPivot().Position;
						this.shot(player, origin, hit);
					}
				});
			}
		});
	}
	shot(player: Player, origin: Vector3, hit: Vector3) {
		this.EntityService.arrow(player, hit, origin);
	}
}
