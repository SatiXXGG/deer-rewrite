import React from "@rbxts/react";
import RQuestPrize from "./prize";
import RQuestDetails from "./details";
import RQuestClaim from "./claim";

export default function RQuestFrame() {
	return (
		<imagelabel
			BackgroundTransparency={1}
			Image={"rbxassetid://93177811613255"}
			key={"Quest"}
			ScaleType={Enum.ScaleType.Fit}
			Size={UDim2.fromScale(0.965455, 0.315305)}
		>
			<RQuestPrize></RQuestPrize>
			<RQuestDetails></RQuestDetails>
			<RQuestClaim></RQuestClaim>
		</imagelabel>
	);
}
