import { useMotion } from "@rbxts/pretty-react-hooks";
import React, { useEffect } from "@rbxts/react";

interface Props {
	title: string;
	current: number;
	max: number;
}

export default function RQuestDetails(props: Props) {
	const [barSize, barMotor] = useMotion(UDim2.fromScale(0, 1));

	useEffect(() => {
		barMotor.tween(UDim2.fromScale(props.current / props.max, 1), {
			time: 0.25,
		});
	}, [props.current, props.max]);

	return (
		<frame
			AnchorPoint={new Vector2(0, 0.5)}
			BackgroundTransparency={1}
			key={"Details"}
			Position={UDim2.fromScale(0.0244821, 0.481651)}
			Size={UDim2.fromScale(0.491525, 0.761468)}
		>
			<uilistlayout
				key={"UIListLayout"}
				Padding={new UDim(0.120482, 0)}
				SortOrder={Enum.SortOrder.LayoutOrder}
				VerticalAlignment={Enum.VerticalAlignment.Center}
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
				key={"Price"}
				Position={UDim2.fromScale(0.5, 0.187219)}
				Size={UDim2.fromScale(1, 0.421687)}
				Text={`(${props.current}/${props.max}`}
				TextColor3={new Color3()}
				TextScaled={true}
				TextXAlignment={Enum.TextXAlignment.Left}
			>
				<uistroke key={"UIStroke"} />

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
					Position={UDim2.fromScale(0.5, 0.45)}
					Size={UDim2.fromScale(1, 1)}
					Text={`${props.title} (${props.current}/${props.max})`}
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

				<uigradient
					key={"UIGradient"}
					Transparency={
						new NumberSequence([new NumberSequenceKeypoint(0, 0.85), new NumberSequenceKeypoint(1, 0.85)])
					}
				/>
			</textlabel>

			<frame
				BackgroundColor3={new Color3()}
				BackgroundTransparency={0.5}
				LayoutOrder={2}
				key={"Bar"}
				Size={UDim2.fromScale(0.996169, 0.385542)}
			>
				<uicorner key={"UICorner"} CornerRadius={new UDim(0.125, 0)} />

				<canvasgroup
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					key={"Holder"}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={barSize}
				>
					<imagelabel
						AnchorPoint={new Vector2(0, 0.5)}
						BackgroundTransparency={1}
						Image={"rbxassetid://106739052273928"}
						key={"Loader"}
						Position={UDim2.fromScale(-0.0842912, 0.5)}
						ScaleType={Enum.ScaleType.Crop}
						Size={UDim2.fromScale(1, 1)}
						SliceCenter={new Rect(36, 0, 690, 0)}
						SliceScale={0.4}
					/>

					<uicorner key={"UICorner"} CornerRadius={new UDim(0.125, 0)} />
				</canvasgroup>
			</frame>
		</frame>
	);
}
