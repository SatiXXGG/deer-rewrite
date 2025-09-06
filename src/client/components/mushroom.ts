import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { CollectionService, Players } from "@rbxts/services";
import { Roles } from "shared/types/RoleTags";
import React from "@rbxts/react";
import { createRoot } from "@rbxts/react-roblox";
import { DeviceTypeHandler, EInputType } from "@rbxts/input-actions";

interface Attributes {}

const messages = {
	[EInputType.Gamepad]: "Press <i>X</i> to eat",
	[EInputType.Touch]: "Press <i>button</i> to eat",
	[EInputType.KeyboardAndMouse]: "Press <i>E</i> to eat",
};

@Component({
	tag: "mushroom",
})
export class Mushroom extends BaseComponent<Attributes, Model> implements OnStart {
	private player = Players.LocalPlayer;

	onStart() {
		const tags = this.player.GetTags();
		if (tags.includes(Roles.deer)) {
			const device = DeviceTypeHandler.GetMainInputType();
			const message = messages[device];
			const ui = React.createElement(
				"BillboardGui",
				{
					Active: true,
					AlwaysOnTop: true,
					MaxDistance: 40,
					ClipsDescendants: true,
					LightInfluence: 1,
					Size: UDim2.fromScale(5, 1),
					ZIndexBehavior: Enum.ZIndexBehavior.Sibling,
				},
				{
					label: React.createElement(
						"TextLabel",
						{
							BackgroundTransparency: 1,
							FontFace: new Font("rbxasset://fonts/families/FredokaOne.json"),
							RichText: true,
							Size: UDim2.fromScale(1, 1),
							Text: message,
							TextColor3: Color3.fromRGB(254, 255, 249),
							TextScaled: true,
						},
						{
							uIStroke: React.createElement("UIStroke", {
								Thickness: 2,
							}),
						},
					),
				},
			);

			const root = createRoot(this.instance);
			root.render(ui);

			const conn = CollectionService.GetInstanceAddedSignal(Roles.wendigo).Connect((instance) => {
				if (instance === this.player) {
					root.unmount();
					conn.Disconnect();
					super.destroy();
				}
			});

			this.instance.Destroying.Connect(() => {
				root.unmount();
				super.destroy();
				conn.Disconnect();
			});
		} else {
			super.destroy();
		}
	}
}
