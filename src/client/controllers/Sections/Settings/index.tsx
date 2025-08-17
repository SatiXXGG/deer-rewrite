import React, { useContext, useEffect, useState } from "@rbxts/react";
import AnimatedWindow from "client/controllers/Elements/AnimatedWindow";
import RSettingsUi from "./ui";
import ROpenedContext from "client/context/currentOpen";

export default function Settings() {
	const [isOpen, setOpen] = useState(true);

	const context = useContext(ROpenedContext);

	useEffect(() => {
		if (context) {
			if (context.opened === "Settings") {
				setOpen(true);
			} else {
				setOpen(false);
			}
		}
	}, [context?.opened]);

	return (
		<AnimatedWindow
			isOpen={isOpen}
			position={UDim2.fromScale(0.5, 0.5)}
			anchorPoint={new Vector2(0.5, 0.5)}
			size={UDim2.fromScale(0.377, 0.743)}
		>
			<RSettingsUi></RSettingsUi>
		</AnimatedWindow>
	);
}
