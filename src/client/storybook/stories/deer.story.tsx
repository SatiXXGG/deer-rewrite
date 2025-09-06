import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { CreateReactStory } from "@rbxts/ui-labs";
import RDeerUi from "client/controllers/HudController/RoleUi/deer";

export = CreateReactStory(
	{
		name: "Deer UI",
		react: React,
		reactRoblox: ReactRoblox,
		controls: {
			hunger: 2000,
		},
	},
	(props) => {
		return <RDeerUi hunger={props.controls.hunger}></RDeerUi>;
	},
);
