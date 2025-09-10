import { Service, OnStart } from "@flamework/core";
import { EntityService } from "./EntityService";
import { Events } from "server/network";
import { GetInfoByClass, IBowInfo } from "shared/data/Skins";
import { EItemClass } from "shared/types/GameItem";

interface IToolInstance extends Tool {
	Handle: BasePart;
}

interface IBowInstance extends IToolInstance {
	Handle: BasePart & {
		firePos: Attachment;
	};
}

@Service({})
export class ToolService implements OnStart {
	constructor(private EntityService: EntityService) {}
	onStart() {
		Events.bow.shot.connect((player, hit) => {
			if (player.Character) {
				const tool = this.getTool<IBowInstance>(player, "bow");
				if (tool) {
					const info = GetInfoByClass<IBowInfo>(EItemClass.bow, tool.Name);
					assert(info, "No info for bow: " + tool.Name);
					const origin = tool.Handle.firePos.WorldPosition;
					this.EntityService.arrow(player, hit, origin, info);
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
}
