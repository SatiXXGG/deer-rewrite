import React, { useContext, useEffect, useState } from "@rbxts/react";
import AnimatedWindow from "client/controllers/Elements/AnimatedWindow";
import RInventoryUi from "./ui";
import ROpenedContext from "client/context/currentOpen";

export default function Inventory() {
	const [isOpen, setOpen] = useState(false);
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
		<AnimatedWindow
			isOpen={isOpen}
			size={UDim2.fromScale(0.538021, 0.593142)}
			position={UDim2.fromScale(0.5, 0.5)}
			anchorPoint={new Vector2(0.5, 0.5)}
		>
			<RInventoryUi></RInventoryUi>
		</AnimatedWindow>
	);
}
