import React, { useState } from "@rbxts/react";
import { Workspace } from "@rbxts/services";

export default function RSanity() {
	const [left, setLeft] = useState(0);

	Workspace.AttributeChanged.Connect((att) => {
		if (att === "remaining") {
			setLeft(Workspace.GetAttribute("remaining") as number);
		}
	});

	return (
		<frame
			BackgroundColor3={new Color3(1, 1, 1)}
			key={"sanity"}
			Position={UDim2.fromScale(0.373326, 0.0177515)}
			Size={UDim2.fromScale(0.253155, 0.138462)}
		>
			<uicorner key={"UICorner"} CornerRadius={new UDim(0.1, 0)} />

			<frame
				BackgroundColor3={Color3.fromRGB(245, 246, 248)}
				key={"bar"}
				Position={UDim2.fromScale(0.0293255, 0.692308)}
				Size={UDim2.fromScale(0.938416, 0.213675)}
			>
				<uicorner key={"UICorner"} CornerRadius={new UDim(0.3, 0)} />

				<frame BackgroundColor3={Color3.fromRGB(249, 88, 93)} key={"bar"} Size={UDim2.fromScale(left / 120, 1)}>
					<uicorner key={"UICorner"} CornerRadius={new UDim(0.3, 0)} />
				</frame>
			</frame>

			<textlabel
				BackgroundTransparency={1}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				key={"text"}
				Position={UDim2.fromScale(0.175953, 0.188034)}
				Size={UDim2.fromScale(0.645161, 0.324786)}
				Text={"Hunter Sanity"}
				TextColor3={new Color3()}
				TextScaled={true}
			/>
		</frame>
	);
}
