import React from "@rbxts/react";

export default function RMaxReward() {
	return (
		<imagelabel
			BackgroundTransparency={1}
			Image={"rbxassetid://83568242936342"}
			LayoutOrder={2}
			key={"Day7"}
			ScaleType={Enum.ScaleType.Fit}
			Size={UDim2.fromScale(0.32228, 1)}
		>
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
				key={"Header"}
				Position={UDim2.fromScale(0.5, 0.0356295)}
				Size={UDim2.fromScale(0.93, 0.154394)}
				Text={"DAY 7"}
				TextColor3={new Color3()}
				TextScaled={true}
			>
				<uistroke key={"UIStroke"} Thickness={5} />

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
					Position={UDim2.fromScale(0.5, 0.452492)}
					Size={UDim2.fromScale(1, 1)}
					Text={"DAY 7"}
					TextColor3={new Color3(1, 1, 1)}
					TextScaled={true}
				>
					<uistroke key={"UIStroke"} Color={Color3.fromRGB(23, 0, 55)} Thickness={4} />
				</textlabel>

				<uigradient
					key={"UIGradient"}
					Transparency={
						new NumberSequence([new NumberSequenceKeypoint(0, 0.9), new NumberSequenceKeypoint(1, 0.9)])
					}
				/>
			</textlabel>

			<frame
				AnchorPoint={new Vector2(0.5, 1)}
				BackgroundTransparency={1}
				key={"Claim"}
				Position={UDim2.fromScale(0.5, 0.952494)}
				Size={UDim2.fromScale(0.62701, 0.176039)}
			>
				<imagebutton
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Image={"rbxassetid://102331547599698"}
					key={"Button"}
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
						Position={UDim2.fromScale(0.5, 0.513889)}
						Size={UDim2.fromScale(0.926267, 0.675325)}
						Text={"CLAIM"}
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
							Text={"CLAIM"}
							TextColor3={new Color3(1, 1, 1)}
							TextScaled={true}
						>
							<uistroke key={"UIStroke"} Color={Color3.fromRGB(9, 53, 0)} Thickness={2.5} />
						</textlabel>

						<uistroke key={"UIStroke"} Thickness={3} />

						<uigradient
							key={"UIGradient"}
							Transparency={
								new NumberSequence([
									new NumberSequenceKeypoint(0, 0.9),
									new NumberSequenceKeypoint(1, 0.9),
								])
							}
						/>
					</textlabel>
				</imagebutton>
			</frame>

			<imagelabel
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Image={"rbxasset://textures/ui/GuiImagePlaceholder.png"}
				key={"PlaceHolder"}
				Position={UDim2.fromScale(0.5, 0.5)}
				ScaleType={Enum.ScaleType.Fit}
				Size={UDim2.fromScale(0.647249, 0.475059)}
				ZIndex={0}
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
				Size={UDim2.fromScale(0.92926, 0.0977995)}
				Text={"+$50,000"}
				TextColor3={new Color3()}
				TextScaled={true}
			>
				<uistroke key={"UIStroke"} Thickness={3} />

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
					Text={"+$50,000"}
					TextColor3={new Color3(1, 1, 1)}
					TextScaled={true}
				>
					<uistroke key={"UIStroke"} Color={Color3.fromRGB(23, 0, 55)} Thickness={3} />

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
						new NumberSequence([new NumberSequenceKeypoint(0, 0.9), new NumberSequenceKeypoint(1, 0.9)])
					}
				/>
			</textlabel>

			<imagelabel
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Image={"rbxassetid://100134256718738"}
				key={"Glow"}
				Position={UDim2.fromScale(0.5, 0.5)}
				ScaleType={Enum.ScaleType.Fit}
				Size={UDim2.fromScale(0.961415, 0.97066)}
				ZIndex={-1}
			/>
		</imagelabel>
	);
}
