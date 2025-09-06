import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { CreateReactStory } from "@rbxts/ui-labs";
import Quests from "client/controllers/Sections/Quests";
import RQuestsUi from "client/controllers/Sections/Quests/ui";

export = CreateReactStory(
	{
		name: "Quests",
		react: React,
		reactRoblox: ReactRoblox,
	},
	() => {
		return <Quests></Quests>;
	},
);
