import React, { useEffect, useState } from "@rbxts/react";
import { Workspace } from "@rbxts/services";

export default function RTimer() {
	const [left, setLeft] = useState(0);
	const [phase, setPhase] = useState("phase");
	const [text, setText] = useState("loading...");

	useEffect(() => {
		setText(`${phase}: ${left}`);
	}, [phase, left]);

	Workspace.AttributeChanged.Connect((att) => {
		if (att === "phase") {
			setPhase(Workspace.GetAttribute("phase") as string);
		} else if (att === "remaining") {
			setLeft(Workspace.GetAttribute("remaining") as number);
		}
	});
	return (
		<frame
			BackgroundTransparency={1}
			key={"main"}
			Position={UDim2.fromScale(0.263932, 0.0231425)}
			Size={UDim2.fromScale(0.472136, 0.0657734)}
		>
			<textlabel
				BackgroundTransparency={1}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				key={"text"}
				Position={UDim2.fromScale(0.0360656, 0.140845)}
				Size={UDim2.fromScale(0.92623, 0.722222)}
				Text={text}
				TextColor3={new Color3(1, 1, 1)}
				TextScaled={true}
			>
				<uistroke key={"UIStroke"} Thickness={4.2} />
			</textlabel>
		</frame>
	);
}
