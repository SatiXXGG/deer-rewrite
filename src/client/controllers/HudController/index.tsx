import { Controller, OnStart } from "@flamework/core";
import { CollectionService, Players } from "@rbxts/services";
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
import RHunterUi from "./RoleUi/hunter";
import RWinnerScreen from "./winner";
import Make from "@rbxts/make";
@Controller({})
export class HudController implements OnStart, onCharacterAdded {
	private player = Players.LocalPlayer;
	private playerGui = this.player.WaitForChild("PlayerGui") as PlayerGui;
	private root = createRoot(this.playerGui);
	private bubbleHover = Make("Sound", {
		Name: "BubbleHover",
		Parent: this.player,
		SoundId: "rbxassetid://77120543307812",
	});

	private bubbleClick = Make("Sound", {
		Name: "BubbleClick",
		Parent: this.player,
		SoundId: "rbxassetid://5852470908",
	});

	onStart() {
		CollectionService.GetInstanceAddedSignal(Roles.hunter).Connect((i) => {
			if (i === this.player) {
				this.root.render(
					<>
						<screengui ZIndexBehavior={"Sibling"} IgnoreGuiInset={true} ResetOnSpawn={true} key={"ResetUi"}>
							<RTimer></RTimer>
							<RHunterUi></RHunterUi>
						</screengui>
						<screengui
							ZIndexBehavior={"Sibling"}
							IgnoreGuiInset={true}
							ResetOnSpawn={false}
							key={"NoResetUi"}
						>
							<RWinnerScreen></RWinnerScreen>
						</screengui>
					</>,
				);
			}
		});
	}

	onCharacterAdded(character: ICharacter): void {
		const player = Players.LocalPlayer;
		if (!player) return; // Por seguridad

		const root = this.root;
		const role = getRole(player);
		print("ROLE: ", role);

		root.unmount();
		task.wait(1);

		if (role === Roles.none) {
			task.wait(1);
			print("Rendering UI ⚠️");
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
		} else if (role === Roles.hunter) {
			root.render(
				<screengui ZIndexBehavior={"Sibling"} IgnoreGuiInset={true} ResetOnSpawn={true}>
					<RTimer></RTimer>
					<RHunterUi></RHunterUi>
				</screengui>,
			);
		}

		task.delay(1, () => {
			print("setting sounds...");
			this.playerGui.GetDescendants().forEach((child) => {
				if (child.IsA("TextButton") || child.IsA("ImageButton")) {
					child.MouseEnter.Connect(() => {
						if (this.bubbleHover.IsPlaying) return;
						this.bubbleHover.Play();
					});
					child.MouseButton1Click.Connect(() => {
						this.bubbleClick.Play();
					});
				}
			});
		});
	}
}
