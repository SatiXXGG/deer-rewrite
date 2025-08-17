import React, { useContext, useEffect, useRef, useState } from "@rbxts/react";
import AnimatedWindow from "client/controllers/Elements/AnimatedWindow";
import RQuestsUi from "./ui";
import ROpenedContext from "client/context/currentOpen";

export default function Quests() {
	const [isOpen, setOpen] = useState(true);
	const frameRef = useRef<ImageLabel>();
	const context = useContext(ROpenedContext);

	useEffect(() => {
		if (context) {
			if (context.opened === "Quests") {
				setOpen(true);
			} else {
				setOpen(false);
			}
		}
	}, [context?.opened]);

	return (
		<>
			<AnimatedWindow
				isOpen={isOpen}
				size={UDim2.fromScale(0.617188, 0.546803)}
				position={UDim2.fromScale(0.5, 0.5)}
				anchorPoint={new Vector2(0.5, 0.5)}
			>
				<RQuestsUi ref={frameRef}></RQuestsUi>
			</AnimatedWindow>
		</>
	);
}
