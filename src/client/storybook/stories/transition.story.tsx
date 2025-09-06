import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { CreateReactStory } from "@rbxts/ui-labs";
import RTransition from "client/controllers/Elements/Transition";

export = CreateReactStory(
	{
		name: "Transition",
		react: React,
		reactRoblox: ReactRoblox,
	},
	(props) => {
		return <RTransition></RTransition>;
	},
);
