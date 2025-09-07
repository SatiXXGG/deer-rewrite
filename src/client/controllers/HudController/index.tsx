import { Controller, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import React from "@rbxts/react";
import { createRoot } from "@rbxts/react-roblox";
import RApp from "./app";
import RTimer from "./timer";
import { onCharacterAdded } from "client/modding/onCharacterAdded/interface";
import { ICharacter } from "shared/components/types/Character";
import getRole from "shared/utils/getRole";
import { Roles } from "shared/types/RoleTags";
import RTransition from "../Elements/Transition";
import RDeerUi from "./RoleUi/deer";
import RWendigoUi from "./RoleUi/wendigo";
@Controller({})
export class HudController implements OnStart, onCharacterAdded {
	onStart() {}

	onCharacterAdded(character: ICharacter): void {
		const player = Players.LocalPlayer;
		if (!player) return; // Por seguridad

		const playerGui = player.WaitForChild("PlayerGui") as PlayerGui;
		const root = createRoot(playerGui);
		const role = getRole(player);
		if (role === Roles.none) {
			root.render(
				<screengui ZIndexBehavior={"Sibling"} ResetOnSpawn={true}>
					<RTimer></RTimer>
					<RApp></RApp>
				</screengui>,
			);
		} else if (role === Roles.deer) {
			root.render(
				<screengui ZIndexBehavior={"Sibling"} IgnoreGuiInset={true} ResetOnSpawn={true}>
					<RTransition></RTransition>
					<RTimer></RTimer>
					<RDeerUi></RDeerUi>
				</screengui>,
			);
		} else if (role === Roles.wendigo) {
			root.render(
				<screengui ZIndexBehavior={"Sibling"} IgnoreGuiInset={true} ResetOnSpawn={true}>
					<RTimer></RTimer>
					<RWendigoUi></RWendigoUi>
				</screengui>,
			);
		}
	}
}
