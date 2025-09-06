import { Controller, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { onCharacterAdded } from "client/modding/onCharacterAdded/interface";
import { ICharacter } from "shared/components/types/Character";
import { TsBow } from "./schemes/bow";
import { IToolScheme } from "./scheme";

export const schemeMap: { [key: string]: IToolScheme } = {
	bow: TsBow,
};

@Controller({})
export class ToolsController implements OnStart, onCharacterAdded {
	private player = Players.LocalPlayer;
	onStart() {
		task.wait(1); //* wait for backpack
		this.player.Backpack.GetChildren().forEach((tool) => {
			// eslint-disable-next-line roblox-ts/lua-truthiness
			if (tool.IsA("Tool") && !tool.GetAttribute("setup")) {
				this.onAdded(tool);
				tool.SetAttribute("setup", true);
			}
		});
		this.player.Backpack.ChildAdded.Connect((tool) => {
			// eslint-disable-next-line roblox-ts/lua-truthiness
			if (tool.IsA("Tool") && !tool.GetAttribute("setup")) {
				this.onAdded(tool);
				tool.SetAttribute("setup", true);
			}
		});
	}
	/**
	 * Bind tool functions
	 * @param tool
	 */
	onAdded(tool: Tool) {
		const scheme = schemeMap[tool.GetAttribute("class") as string];
		print(scheme);
		if (scheme) {
			scheme.setup(this.player.Character as ICharacter);
			tool.Equipped.Connect(() => scheme.equipped(this.player.Character as ICharacter));
			tool.Unequipped.Connect(() => scheme.unequipped(this.player.Character as ICharacter));
		}
	}
	onCharacterAdded(character: ICharacter): void {
		character.ChildAdded.Connect((tool) => {
			// eslint-disable-next-line roblox-ts/lua-truthiness
			if (tool.IsA("Tool") && !tool.GetAttribute("setup")) {
				this.onAdded(tool);
				tool.SetAttribute("setup", true);
			}
		});
	}
}
