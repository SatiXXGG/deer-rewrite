import React from "@rbxts/react";
import RInventoryHeader from "./header";
import RInventoryHolder from "./holder";

export default function RInventoryUi() {
	return (
		<imagelabel
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
			Image={"rbxassetid://133119942222650"}
			key={"AllSkins"}
			Position={UDim2.fromScale(0.5, 0.5)}
			ScaleType={Enum.ScaleType.Fit}
			Size={UDim2.fromScale(1, 1)}
			ZIndex={2}
		>
			<uiaspectratioconstraint key={"UIAspectRatioConstraint"} AspectRatio={1.61406} />
			<RInventoryHeader></RInventoryHeader>
			<RInventoryHolder></RInventoryHolder>
		</imagelabel>
	);
}
