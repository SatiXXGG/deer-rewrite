import { useSpring } from "@rbxts/pretty-react-hooks";
import React, { useState } from "@rbxts/react";

export default function RShopButton() {
	const [scale, setScale] = useState(1);
	const [hovering, setHovering] = useState(false);
	const scaleSpring = useSpring(scale, {
		damping: 0.5,
	});

	return (
		<imagebutton
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
			Image={"rbxassetid://101728594305016"}
			LayoutOrder={4}
			key={"Shop"}
			ScaleType={Enum.ScaleType.Fit}
			Size={UDim2.fromScale(0.201942, 1)}
			Event={{
				Activated: () => {
					setScale(1.15);
					task.delay(0.1, () => {
						if (hovering) {
							setScale(1.1);
						} else {
							setScale(1);
						}
					});
				},
				MouseEnter: () => {
					setScale(1.1);
					setHovering(true);
				},
				MouseLeave: () => {
					setScale(1);
					setHovering(false);
				},
			}}
		>
			<imagelabel
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Image={"rbxassetid://101918677909691"}
				key={"Icon"}
				Position={UDim2.fromScale(0.5, 0.5)}
				ScaleType={Enum.ScaleType.Fit}
				Size={UDim2.fromScale(0.451923, 0.764228)}
			/>

			<textlabel
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundTransparency={1}
				FontFace={
					new Font(
						"rbxasset://fonts/families/GothamSSm.json",
						Enum.FontWeight.ExtraBold,
						Enum.FontStyle.Normal,
					)
				}
				key={"Name"}
				Position={UDim2.fromScale(0.5, 1.01626)}
				Size={UDim2.fromScale(1, 0.420965)}
				Text={"SHOP"}
				TextColor3={new Color3(1, 1, 1)}
				TextScaled={true}
			>
				<uistroke key={"UIStroke"} Thickness={3} />
			</textlabel>

			<uiscale key={"UIScale"} Scale={scaleSpring} />
		</imagebutton>
	);
}
