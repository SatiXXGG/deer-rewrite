import React, { Element, useEffect, useState } from "@rbxts/react";
import RQuestFrame from "./QuestFrame";
import useAttribute from "client/controllers/hooks/useAttribute";
import useElapsed from "client/controllers/hooks/useElapsed";
import { Players } from "@rbxts/services";

interface Props {
	children?: Element | Element[];
}
export default function RQuestDaily(props: Props) {
	const gotDailyQuests = useAttribute<number>(Players.LocalPlayer, "gaveDailyQuests", 1);
	const elapsedSinceDaily = useElapsed(gotDailyQuests ?? 0, {
		invert: true,
		maxDays: 1,
	});
	const [dailyTimer, setDailyTimer] = useState("Loading...");

	useEffect(() => {
		setDailyTimer(`${elapsedSinceDaily.hours}:${elapsedSinceDaily.minutes}:${elapsedSinceDaily.seconds}`);
	}, [elapsedSinceDaily]);

	return (
		<frame
			BackgroundColor3={new Color3()}
			BackgroundTransparency={0.5}
			key={"Daily"}
			Position={UDim2.fromScale(0.245504, -0.561201)}
			Size={UDim2.fromScale(0.491071, 1)}
		>
			<uicorner key={"UICorner"} CornerRadius={new UDim(0.0184758, 0)} />

			<frame
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundTransparency={1}
				key={"Header"}
				Position={UDim2.fromScale(0.5, 0.0277136)}
				Size={UDim2.fromScale(0.956364, 0.115473)}
			>
				<textlabel
					AnchorPoint={new Vector2(1, 0.5)}
					BackgroundTransparency={1}
					FontFace={
						new Font(
							"rbxasset://fonts/families/GothamSSm.json",
							Enum.FontWeight.ExtraBold,
							Enum.FontStyle.Normal,
						)
					}
					key={"Timer"}
					Position={UDim2.fromScale(1, 0.5)}
					Size={UDim2.fromScale(0.44522, 1)}
					Text={dailyTimer}
					TextColor3={new Color3(1, 1, 1)}
					TextScaled={true}
					TextXAlignment={Enum.TextXAlignment.Right}
				>
					<uigradient
						key={"UIGradient"}
						Color={
							new ColorSequence([
								new ColorSequenceKeypoint(0, Color3.fromRGB(255, 0, 4)),
								new ColorSequenceKeypoint(0.3, Color3.fromRGB(255, 0, 4)),
								new ColorSequenceKeypoint(0.7, Color3.fromRGB(255, 0, 111)),
								new ColorSequenceKeypoint(1, Color3.fromRGB(255, 0, 111)),
							])
						}
						Rotation={90}
					/>
				</textlabel>

				<textlabel
					AnchorPoint={new Vector2(0, 0.5)}
					BackgroundTransparency={1}
					FontFace={
						new Font(
							"rbxasset://fonts/families/GothamSSm.json",
							Enum.FontWeight.ExtraBold,
							Enum.FontStyle.Normal,
						)
					}
					key={"Txt"}
					Position={UDim2.fromScale(0, 0.5)}
					Size={UDim2.fromScale(0.421704, 1)}
					Text={"DAILY"}
					TextColor3={new Color3(1, 1, 1)}
					TextScaled={true}
					TextXAlignment={Enum.TextXAlignment.Left}
				>
					<uigradient
						key={"UIGradient"}
						Color={
							new ColorSequence([
								new ColorSequenceKeypoint(0, Color3.fromRGB(255, 255, 0)),
								new ColorSequenceKeypoint(0.2, Color3.fromRGB(255, 255, 0)),
								new ColorSequenceKeypoint(0.7, Color3.fromRGB(255, 174, 0)),
								new ColorSequenceKeypoint(1, Color3.fromRGB(255, 174, 0)),
							])
						}
						Rotation={90}
					/>
				</textlabel>
			</frame>

			<frame
				AnchorPoint={new Vector2(0.5, 1)}
				BackgroundTransparency={1}
				ClipsDescendants={true}
				key={"Slots"}
				Position={UDim2.fromScale(0.5, 1)}
				Size={UDim2.fromScale(1, 0.838337)}
			>
				<scrollingframe
					AnchorPoint={new Vector2(0.5, 0.5)}
					AutomaticCanvasSize={Enum.AutomaticSize.Y}
					BackgroundTransparency={1}
					BottomImage={"rbxassetid://93079608146987"}
					CanvasSize={new UDim2()}
					ClipsDescendants={false}
					MidImage={"rbxassetid://103921755022681"}
					key={"Scroller"}
					Position={UDim2.fromScale(0.5, 0.488981)}
					ScrollBarImageTransparency={1}
					ScrollBarThickness={0}
					ScrollingDirection={Enum.ScrollingDirection.Y}
					Size={UDim2.fromScale(1, 0.952333)}
					TopImage={"rbxassetid://132456408835496"}
				>
					<uilistlayout
						key={"UIListLayout"}
						HorizontalAlignment={Enum.HorizontalAlignment.Center}
						Padding={new UDim(0.0231417, 0)}
						SortOrder={Enum.SortOrder.LayoutOrder}
					/>
					{props.children}
				</scrollingframe>
			</frame>
		</frame>
	);
}
