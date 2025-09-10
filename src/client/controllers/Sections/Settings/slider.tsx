import React, { useEffect, useRef, useState } from "@rbxts/react";
import useSetting from "client/controllers/hooks/useSettings";
import { EUserSetting, TUserSettings } from "shared/data/UserSettings";

interface Props {
	setting: EUserSetting;
	title: string;
	desc: string;
}

export default function RSliderSetting(props: Props) {
	const { setValue, value } = useSetting(props.setting);
	const [percentage, setPercentage] = useState(0.5);
	const info = TUserSettings[props.setting];
	const max = info.max!;
	const min = info.min!;
	const containerRef = useRef<Frame>();
	const draggerRef = useRef<ImageButton>();
	const dragging = useRef(false);

	useEffect(() => {
		if (!dragging.current) {
			const c = value;
			setPercentage((value as number) / max);
		}
	}, [value]);
	return (
		<imagelabel
			BackgroundTransparency={1}
			Image={"rbxassetid://109967452970179"}
			LayoutOrder={3}
			key={"Setting2"}
			ScaleType={Enum.ScaleType.Fit}
			Size={UDim2.fromScale(0.971116, 0.256711)}
		>
			<frame
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundColor3={new Color3(1, 1, 1)}
				BackgroundTransparency={0.999}
				BorderColor3={new Color3()}
				BorderSizePixel={0}
				key={"Details"}
				Position={UDim2.fromScale(0.5, 0.109489)}
				Size={UDim2.fromScale(0.948485, 0.359477)}
			>
				<uilistlayout
					key={"UIListLayout"}
					FillDirection={Enum.FillDirection.Horizontal}
					Padding={new UDim(0.048, 0)}
					SortOrder={Enum.SortOrder.LayoutOrder}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>

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
					Position={UDim2.fromScale(0.0847154, 0.5)}
					Size={UDim2.fromScale(0.169329, 1)}
					Text={props.title}
					TextColor3={new Color3(1, 1, 1)}
					TextScaled={true}
					TextXAlignment={Enum.TextXAlignment.Left}
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
						Position={UDim2.fromScale(0.5, 0.45)}
						Size={UDim2.fromScale(1, 1)}
						Text={props.title}
						TextColor3={new Color3(1, 1, 1)}
						TextScaled={true}
						TextXAlignment={Enum.TextXAlignment.Left}
					/>

					<uigradient
						key={"UIGradient"}
						Color={
							new ColorSequence([
								new ColorSequenceKeypoint(0, new Color3()),
								new ColorSequenceKeypoint(1, new Color3()),
							])
						}
						Transparency={
							new NumberSequence([
								new NumberSequenceKeypoint(0, 0.85),
								new NumberSequenceKeypoint(1, 0.85),
							])
						}
					/>
				</textlabel>

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
					LayoutOrder={2}
					key={"Description"}
					Position={UDim2.fromScale(0.604475, 0.5)}
					Size={UDim2.fromScale(0.773163, 0.709091)}
					Text={props.desc}
					TextColor3={new Color3(1, 1, 1)}
					TextScaled={true}
					TextXAlignment={Enum.TextXAlignment.Left}
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
						Position={UDim2.fromScale(0.5, 0.45)}
						Size={UDim2.fromScale(1, 1)}
						Text={props.desc}
						TextColor3={new Color3(1, 1, 1)}
						TextScaled={true}
						TextXAlignment={Enum.TextXAlignment.Left}
					>
						<uigradient
							key={"UIGradient"}
							Transparency={
								new NumberSequence([
									new NumberSequenceKeypoint(0, 0.34),
									new NumberSequenceKeypoint(1, 0.34),
								])
							}
						/>
					</textlabel>

					<uigradient
						key={"UIGradient"}
						Color={
							new ColorSequence([
								new ColorSequenceKeypoint(0, new Color3()),
								new ColorSequenceKeypoint(1, new Color3()),
							])
						}
						Transparency={
							new NumberSequence([
								new NumberSequenceKeypoint(0, 0.85),
								new NumberSequenceKeypoint(1, 0.85),
							])
						}
					/>
				</textlabel>
			</frame>

			<frame
				AnchorPoint={new Vector2(0, 1)}
				BackgroundColor3={new Color3()}
				BackgroundTransparency={0.5}
				key={"Bar"}
				Position={UDim2.fromScale(0.0257576, 0.816993)}
				Size={UDim2.fromScale(0.815152, 0.228758)}
				ref={containerRef}
			>
				<uicorner key={"UICorner"} CornerRadius={new UDim(1, 0)} />

				<imagebutton
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Image={"rbxassetid://95265795654179"}
					key={"Indicator"}
					Position={UDim2.fromScale(percentage, 0.5)}
					ScaleType={Enum.ScaleType.Fit}
					Size={UDim2.fromScale(0.0966543, 1.48571)}
					ref={draggerRef}
				>
					<uicorner key={"UICorner"} CornerRadius={new UDim(1, 0)} />
					<uidragdetector
						Event={{
							DragContinue: () => {
								if (draggerRef.current) {
									const current = math.floor(draggerRef.current.Position.X.Scale * 100) / 100;
									setValue(math.clamp(math.round(min + current * (max - min)), min!, max));
								}
							},
							DragStart: () => {
								dragging.current = true;
							},
							DragEnd: () => {
								dragging.current = false;
							},
						}}
						ResponseStyle={Enum.UIDragDetectorResponseStyle.Scale}
						DragStyle={Enum.UIDragDetectorDragStyle.TranslateLine}
						BoundingUI={containerRef}
						ReferenceUIInstance={containerRef}
					></uidragdetector>
				</imagebutton>
			</frame>

			<textlabel
				AnchorPoint={new Vector2(1, 1)}
				BackgroundTransparency={1}
				FontFace={
					new Font(
						"rbxasset://fonts/families/GothamSSm.json",
						Enum.FontWeight.ExtraBold,
						Enum.FontStyle.Normal,
					)
				}
				key={"Txt"}
				Position={UDim2.fromScale(0.978788, 0.895425)}
				Size={UDim2.fromScale(0.133333, 0.379085)}
				Text={tostring(value! as number)}
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
					Position={UDim2.fromScale(0.517045, 0.45)}
					Size={UDim2.fromScale(1.01136, 1)}
					Text={tostring(value! as number)}
					TextColor3={new Color3(1, 1, 1)}
					TextScaled={true}
				/>

				<uigradient
					key={"UIGradient"}
					Color={
						new ColorSequence([
							new ColorSequenceKeypoint(0, new Color3()),
							new ColorSequenceKeypoint(1, new Color3()),
						])
					}
					Transparency={
						new NumberSequence([new NumberSequenceKeypoint(0, 0.85), new NumberSequenceKeypoint(1, 0.85)])
					}
				/>
			</textlabel>
		</imagelabel>
	);
}
