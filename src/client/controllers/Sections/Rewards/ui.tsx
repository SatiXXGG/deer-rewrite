import React from "@rbxts/react";
import RHeaderReward from "./header";
import RHolderReward from "./holder";
export default function RUiRewards() {
	return (
		<imagelabel
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
			Image={"rbxassetid://135016677643329"}
			key={"DailyRewards"}
			Position={UDim2.fromScale(0.5, 0.5)}
			ScaleType={Enum.ScaleType.Fit}
			Size={UDim2.fromScale(1, 1)}
			ZIndex={2}
		>
			<uiaspectratioconstraint key={"UIAspectRatioConstraint"} AspectRatio={1.80351} />
			<RHeaderReward></RHeaderReward>
			<RHolderReward></RHolderReward>
		</imagelabel>
	);
}
