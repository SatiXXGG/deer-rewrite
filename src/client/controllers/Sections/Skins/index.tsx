import React, { useContext, useEffect, useState } from "@rbxts/react";
import AnimatedWindow from "client/controllers/Elements/AnimatedWindow";
import RSkinsUi from "./ui";
import ROpenedContext from "client/context/currentOpen";

export default function Skins() {
	const [isOpen, setOpen] = useState(true);
	const context = useContext(ROpenedContext);

	useEffect(() => {
		if (context) {
			if (context.opened === "Skins") {
				setOpen(true);
			} else {
				setOpen(false);
			}
		}
	}, [context?.opened]);
	return (
		<AnimatedWindow
			isOpen={isOpen}
			size={UDim2.fromScale(0.538542, 0.529685)}
			position={UDim2.fromScale(0.5, 0.5)}
			anchorPoint={new Vector2(0.5, 0.5)}
		>
			<RSkinsUi></RSkinsUi>
		</AnimatedWindow>
	);
}
