import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { CreateReactStory } from "@rbxts/ui-labs";
import RHunterUi from "client/controllers/HudController/RoleUi/hunter";

export = CreateReactStory(
	{
		name: "Hunter UI",
		react: React,
		reactRoblox: ReactRoblox,
	},
	() => {
		return <RHunterUi></RHunterUi>;
	},
);
