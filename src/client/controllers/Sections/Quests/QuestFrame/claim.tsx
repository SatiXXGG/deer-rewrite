import { useMotion } from "@rbxts/pretty-react-hooks";
import React, { useEffect } from "@rbxts/react";
import { Events } from "client/network";
import { EQuestStatus } from "shared/data/Quest";

interface Props {
	status: EQuestStatus;
	id: number;
}

const StatusTexts: { [key in EQuestStatus]: string } = {
	[EQuestStatus.Active]: "X",
	[EQuestStatus.Completed]: "Claim",
	[EQuestStatus.Claimed]: "Claimed",
};

const StatusColors: { [key in EQuestStatus]: Color3 } = {
	[EQuestStatus.Active]: new Color3(1, 0, 0),
	[EQuestStatus.Completed]: new Color3(1, 1, 1),
	[EQuestStatus.Claimed]: new Color3(1, 0.55, 0.07),
};

export default function RQuestClaim({ status, id }: Props) {
	const text = StatusTexts[status];
	const [color, colorMotor] = useMotion(StatusColors[status]);

	useEffect(() => {
		colorMotor.tween(StatusColors[status], { time: 0.4 });
	}, [status]);

	return (
		<frame
			AnchorPoint={new Vector2(0.5, 1)}
			BackgroundColor3={new Color3(1, 1, 1)}
			BackgroundTransparency={0.999}
			BorderColor3={new Color3()}
			BorderSizePixel={0}
			key={"Claim"}
			Position={UDim2.fromScale(0.663842, 0.848073)}
			Size={UDim2.fromScale(0.244821, 0.449541)}
		>
			<imagebutton
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Image={"rbxassetid://128585193702682"}
				key={"Button"}
				Position={UDim2.fromScale(0.5, 0.5)}
				ScaleType={Enum.ScaleType.Fit}
				Size={UDim2.fromScale(1, 1)}
				ImageColor3={color}
				Event={{
					Activated: () => {
						if (status === EQuestStatus.Completed) {
							Events.quest.claim.fire(id);
						}
					},
				}}
			>
				<textlabel
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					FontFace={
						new Font(
							"rbxasset://fonts/families/GothamSSm.json",
							Enum.FontWeight.ExtraBold,
							Enum.FontStyle.Normal,
						)
					}
					key={"Txt"}
					Position={UDim2.fromScale(0.5, 0.513889)}
					Size={UDim2.fromScale(0.926267, 0.675325)}
					Text={text}
					TextColor3={new Color3(1, 1, 1)}
					TextScaled={true}
				>
					<textlabel
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundTransparency={1}
						FontFace={
							new Font(
								"rbxasset://fonts/families/GothamSSm.json",
								Enum.FontWeight.ExtraBold,
								Enum.FontStyle.Normal,
							)
						}
						key={"Txt"}
						Position={UDim2.fromScale(0.5, 0.458868)}
						Size={UDim2.fromScale(1, 1)}
						Text={text}
						TextColor3={new Color3(1, 1, 1)}
						TextScaled={true}
					>
						<uistroke key={"UIStroke"} Color={Color3.fromRGB(9, 53, 0)} Thickness={2.5} />
					</textlabel>

					<uistroke key={"UIStroke"} Thickness={3} />

					<uigradient
						key={"UIGradient"}
						Transparency={
							new NumberSequence([new NumberSequenceKeypoint(0, 0.9), new NumberSequenceKeypoint(1, 0.9)])
						}
					/>
				</textlabel>
			</imagebutton>
		</frame>
	);
}
