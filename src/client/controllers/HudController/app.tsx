import React, { useEffect, useState } from "@rbxts/react";
import RButtonContainer from "./buttonContainer";
import { RSectionButton } from "./sectionButton";
import RShopButton from "./shopButton";
import ROpenedContext from "client/context/currentOpen";
import Quests from "../Sections/Quests";
import Rewards from "../Sections/Rewards";
import Settings from "../Sections/Settings";
import Skins from "../Sections/Skins";

export default function RApp() {
	const [opened, setOpened] = useState<string | undefined>(undefined);

	return (
		<ROpenedContext.Provider value={{ opened, setOpened }}>
			<Quests></Quests>
			<Rewards></Rewards>
			<Settings></Settings>
			<Skins></Skins>
			<RButtonContainer>
				<RSectionButton order={1} id="Info" imageId="rbxassetid://108044423266343" />
				<RSectionButton order={2} id="Inventory" imageId="rbxassetid://132634674535219" />
				<RSectionButton order={3} id="Quests" imageId="rbxassetid://86402389205031" />
				<RShopButton />
				<RSectionButton order={5} id="Settings" imageId="rbxassetid://135801440901413" />
				<RSectionButton order={6} id="Daily" imageId="rbxassetid://87897749759398" />
				<RSectionButton order={7} id="Spectate" imageId="rbxassetid://70499117436834" />
			</RButtonContainer>
		</ROpenedContext.Provider>
	);
}
