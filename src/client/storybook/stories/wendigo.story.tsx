import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { CreateReactStory } from "@rbxts/ui-labs";
import RDeerUi from "client/controllers/HudController/RoleUi/deer";
import RWendigoUi from "client/controllers/HudController/RoleUi/wendigo";

export = CreateReactStory(
	{
		name: "Wendigo UI",
		react: React,
		reactRoblox: ReactRoblox,
	},
	() => {
		return <RWendigoUi></RWendigoUi>;
	},
);
