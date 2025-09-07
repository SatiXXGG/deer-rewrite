import React, { useMemo } from "@rbxts/react";
import RQuestPrize from "./prize";
import RQuestDetails from "./details";
import RQuestClaim from "./claim";
import { EQuests, EQuestStatus, GetQuestData } from "shared/data/Quest";
import { StringIcons } from "shared/data/Icon";

interface Props {
	title: string;
	current: number;
	reference: EQuests;
	status: EQuestStatus;
	id: number;
}
export default function RQuestFrame(props: Props) {
	const data = GetQuestData(props.reference);
	return (
		<imagelabel
			BackgroundTransparency={1}
			Image={"rbxassetid://93177811613255"}
			key={"Quest"}
			ScaleType={Enum.ScaleType.Fit}
			Size={UDim2.fromScale(0.965455, 0.315305)}
		>
			<RQuestPrize image={StringIcons[data.reward[0]] ?? ""} amount={data.reward[1]}></RQuestPrize>
			<RQuestDetails title={props.title} current={props.current} max={data.max}></RQuestDetails>
			<RQuestClaim id={props.id} status={props.status}></RQuestClaim>
		</imagelabel>
	);
}
