import React, { useContext, useEffect, useState } from "@rbxts/react";
import AnimatedWindow from "client/controllers/Elements/AnimatedWindow";
import RInventoryUi from "./ui";
import ROpenedContext from "client/context/currentOpen";
import RInventoryContext, { InventoryIds } from "client/context/inventorySelected";
import { DeerSkinsInfo, EDeerSkins } from "shared/data/Skins";
import { EItemClass } from "shared/types/GameItem";

export default function Inventory() {
	const [isOpen, setOpen] = useState(false);
	const [id, setId] = useState<InventoryIds>(EDeerSkins.default);
	const [Class, setClass] = useState<EItemClass>(EItemClass.deer);

	const context = useContext(ROpenedContext);

	useEffect(() => {
		if (context) {
			if (context.opened === "Inventory") {
				setOpen(true);
			} else {
				setOpen(false);
			}
		}
	}, [context?.opened]);
	return (
		<RInventoryContext.Provider value={{ setSelected: setId, selected: id, Class: Class, setClass }}>
			<AnimatedWindow
				isOpen={isOpen}
				size={UDim2.fromScale(0.538021, 0.593142)}
				position={UDim2.fromScale(0.5, 0.5)}
				anchorPoint={new Vector2(0.5, 0.5)}
			>
				<RInventoryUi></RInventoryUi>
			</AnimatedWindow>
		</RInventoryContext.Provider>
	);
}
