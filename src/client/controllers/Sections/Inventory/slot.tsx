import React from "@rbxts/react";

export default function RInventorySlot() {
	return (
		<imagebutton
			BackgroundTransparency={1}
			Image={"rbxassetid://136200029712336"}
			key={"Slot"}
			ScaleType={Enum.ScaleType.Fit}
			Size={UDim2.fromOffset(100, 100)}
		>
			<viewportframe BackgroundTransparency={1} key={"preview"} Size={UDim2.fromScale(1, 1)} />

			<imagelabel
				BackgroundTransparency={1}
				key={"img"}
				Position={UDim2.fromScale(0.180785, 0.180785)}
				Size={UDim2.fromOffset(52, 52)}
			/>
		</imagebutton>
	);
}
