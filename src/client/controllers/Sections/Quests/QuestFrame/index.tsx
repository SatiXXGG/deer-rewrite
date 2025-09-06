import React from "@rbxts/react";
import RQuestPrize from "./prize";
import RQuestDetails from "./details";
import RQuestClaim from "./claim";

interface Props {
	title: string;
	current: number;
	max: number;
}
export default function RQuestFrame(props: Props) {
	return (
		<imagelabel
			BackgroundTransparency={1}
			Image={"rbxassetid://93177811613255"}
			key={"Quest"}
			ScaleType={Enum.ScaleType.Fit}
			Size={UDim2.fromScale(0.965455, 0.315305)}
		>
			<RQuestPrize></RQuestPrize>
			<RQuestDetails title={props.title} current={props.current} max={props.max}></RQuestDetails>
			<RQuestClaim></RQuestClaim>
		</imagelabel>
	);
}
