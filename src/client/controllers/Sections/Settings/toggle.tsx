import { useSpring } from "@rbxts/pretty-react-hooks";
import React, { useState } from "@rbxts/react";

interface Props {
	active: boolean;
	title: string;
	desc: string;
}

export default function RToggleSetting(props: Props) {
	const [active, setActive] = useState(props.active);
	const [hover, setHover] = useState(false);
	const [scale, setScale] = useState(1);
	const toggleEvents: React.InstanceEvent<ImageButton> = {
		Activated: () => {
			setActive(!active);
			setScale(1.2);
			task.delay(0.1, () => {
				if (hover) {
					setScale(1);
				} else {
					setScale(1.1);
				}
			});
		},
		MouseEnter: () => {
			setScale(1.1);
			setHover(true);
		},
		MouseLeave: () => {
			setScale(1);
			setHover(false);
		},
	};

	const spring = useSpring(scale, {
		damping: 0.5,
	});

	return (
		<imagelabel
			BackgroundTransparency={1}
			Image={"rbxassetid://119545232142694"}
			LayoutOrder={1}
			key={"Setting1"}
			ScaleType={Enum.ScaleType.Fit}
			Size={UDim2.fromScale(0.971116, 0.229866)}
		>
			<frame
				AnchorPoint={new Vector2(1, 1)}
				BackgroundTransparency={1}
				key={"Button"}
				Position={UDim2.fromScale(0.974242, 0.875912)}
				Size={UDim2.fromScale(0.218182, 0.445255)}
			>
				<imagebutton
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					ImageTransparency={1}
					key={"HitBox"}
					Position={UDim2.fromScale(0.5, 0.5)}
					ScaleType={Enum.ScaleType.Fit}
					Size={UDim2.fromScale(1, 1)}
					Event={toggleEvents}
				>
					<uiscale Scale={spring}></uiscale>
					<imagelabel
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundTransparency={1}
						Image={active ? "rbxassetid://135526265715691" : "rbxassetid://125291476521875"}
						key={"On"}
						Position={UDim2.fromScale(0.5, 0.5)}
						ScaleType={Enum.ScaleType.Fit}
						Size={UDim2.fromScale(1, 1)}
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
							Position={UDim2.fromScale(0.5, 0.516393)}
							Size={UDim2.fromScale(0.926267, 0.675325)}
							Text={active ? "ON" : "OFF"}
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
								Position={UDim2.fromScale(0.5, 0.45145)}
								Size={UDim2.fromScale(1, 1)}
								Text={active ? "ON" : "OFF"}
								TextColor3={new Color3(1, 1, 1)}
								TextScaled={true}
							>
								<uistroke key={"UIStroke"} Color={Color3.fromRGB(9, 53, 0)} Thickness={2.5} />
							</textlabel>

							<uistroke key={"UIStroke"} Thickness={3} />

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
					</imagelabel>
				</imagebutton>
			</frame>

			<frame
				AnchorPoint={new Vector2(0, 0.5)}
				BackgroundColor3={new Color3(1, 1, 1)}
				BackgroundTransparency={0.999}
				BorderColor3={new Color3()}
				BorderSizePixel={0}
				key={"Details"}
				Position={UDim2.fromScale(0.0257576, 0.5)}
				Size={UDim2.fromScale(0.6873, 0.912409)}
			>
				<uilistlayout
					key={"UIListLayout"}
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
					Position={UDim2.fromScale(0.5, 0.516393)}
					Size={UDim2.fromScale(1, 0.44)}
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
					Position={UDim2.fromScale(0.5, 0.516393)}
					Size={UDim2.fromScale(0.998637, 0.312)}
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
		</imagelabel>
	);
}
