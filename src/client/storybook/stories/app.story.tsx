import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { CreateReactStory } from "@rbxts/ui-labs";
import RApp from "client/controllers/HudController/app";
import RButtonContainer from "client/controllers/HudController/buttonContainer";
import { RSectionButton } from "client/controllers/HudController/sectionButton";
import RShopButton from "client/controllers/HudController/shopButton";

export = CreateReactStory(
	{
		name: "Hud App",
		react: React,
		reactRoblox: ReactRoblox,
	},
	(props) => {
		return (
			<RButtonContainer>
				<RSectionButton order={1} id="Info" imageId="rbxassetid://108044423266343" />
				<RSectionButton order={2} id="Inventory" imageId="rbxassetid://132634674535219" />
				<RSectionButton order={3} id="Quests" imageId="rbxassetid://86402389205031" />
				<RShopButton />
				<RSectionButton order={5} id="Settings" imageId="rbxassetid://135801440901413" />
				<RSectionButton order={6} id="Daily" imageId="rbxassetid://87897749759398" />
				<RSectionButton order={7} id="Spectate" imageId="rbxassetid://70499117436834" />
			</RButtonContainer>
		);
	},
);
