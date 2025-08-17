import AnimatedWindow from "client/controllers/Elements/AnimatedWindow";
import RUiRewards from "./ui";
import React, { useContext, useEffect, useState } from "@rbxts/react";
import ROpenedContext from "client/context/currentOpen";

export default function Rewards() {
	const [isOpen, setOpen] = useState(true);
	const context = useContext(ROpenedContext);

	useEffect(() => {
		if (context) {
			if (context.opened === "Daily") {
				setOpen(true);
			} else {
				setOpen(false);
			}
		}
	}, [context?.opened]);

	return (
		<AnimatedWindow
			isOpen={isOpen}
			size={UDim2.fromScale(0.535417, 0.528267)}
			anchorPoint={new Vector2(0.5, 0.5)}
			position={UDim2.fromScale(0.5, 0.5)}
		>
			<RUiRewards></RUiRewards>
		</AnimatedWindow>
	);
}
