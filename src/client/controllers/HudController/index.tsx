import { Controller, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import React from "@rbxts/react";
import { createRoot } from "@rbxts/react-roblox";
import RApp from "./app";
@Controller({})
export class HudController implements OnStart {
	onStart() {
		const player = Players.LocalPlayer;
		if (!player) return; // Por seguridad

		const playerGui = player.WaitForChild("PlayerGui") as PlayerGui;
		const root = createRoot(playerGui);
		root.render(
			<screengui ZIndexBehavior={"Sibling"}>
				<RApp></RApp>
			</screengui>,
		);
	}
}
