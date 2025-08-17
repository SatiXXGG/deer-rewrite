import React from "@rbxts/react";

export default function RSliderSetting() {
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
					Text={"FOV"}
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
						Text={"FOV"}
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
					Text={"Insert setting desc here"}
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
						Text={"Insert setting desc here"}
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
			>
				<uicorner key={"UICorner"} CornerRadius={new UDim(1, 0)} />

				<imagebutton
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Image={"rbxassetid://95265795654179"}
					key={"Indicator"}
					Position={UDim2.fromScale(0.5, 0.5)}
					ScaleType={Enum.ScaleType.Fit}
					Size={UDim2.fromScale(0.0966543, 1.48571)}
				>
					<uicorner key={"UICorner"} CornerRadius={new UDim(1, 0)} />
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
				Text={"75"}
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
					Text={"75"}
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
