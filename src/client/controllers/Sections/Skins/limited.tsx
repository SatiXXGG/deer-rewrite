import React from "@rbxts/react";

export default function RSkinsLimited() {
	return (
		<imagelabel
			BackgroundTransparency={1}
			Image={"rbxassetid://72717305505122"}
			key={"Limited"}
			ScaleType={Enum.ScaleType.Fit}
			Size={UDim2.fromScale(0.336117, 1)}
		>
			<frame
				AnchorPoint={new Vector2(0.5, 1)}
				BackgroundTransparency={1}
				key={"Buy"}
				Position={UDim2.fromScale(0.5, 0.951574)}
				Size={UDim2.fromScale(0.506211, 0.145278)}
			>
				<imagebutton
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Image={"rbxassetid://124390301475877"}
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
						Position={UDim2.fromScale(0.5, 0.518868)}
						Size={UDim2.fromScale(0.926267, 0.675325)}
						Text={"BUY"}
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
							Text={"BUY"}
							TextColor3={new Color3(1, 1, 1)}
							TextScaled={true}
						>
							<uistroke key={"UIStroke"} Color={Color3.fromRGB(9, 53, 0)} Thickness={3} />
						</textlabel>

						<uistroke key={"UIStroke"} Thickness={3.2} />

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
				key={"Name"}
				Position={UDim2.fromScale(0.5, 0.0484262)}
				Size={UDim2.fromScale(0.925466, 0.217918)}
				Text={"skin name"}
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
					Position={UDim2.fromScale(0.5, 0.466667)}
					Size={UDim2.fromScale(1, 1)}
					Text={"skin name"}
					TextColor3={new Color3(1, 1, 1)}
					TextScaled={true}
				>
					<uistroke key={"UIStroke"} Color={Color3.fromRGB(23, 0, 55)} Thickness={3} />
				</textlabel>

				<uistroke key={"UIStroke"} Thickness={3.2} />

				<uigradient
					key={"UIGradient"}
					Transparency={
						new NumberSequence([new NumberSequenceKeypoint(0, 0.9), new NumberSequenceKeypoint(1, 0.9)])
					}
				/>
			</textlabel>

			<textlabel
				AnchorPoint={new Vector2(0.5, 1)}
				BackgroundTransparency={1}
				FontFace={
					new Font(
						"rbxasset://fonts/families/GothamSSm.json",
						Enum.FontWeight.ExtraBold,
						Enum.FontStyle.Normal,
					)
				}
				key={"Alert"}
				Position={UDim2.fromScale(0.5, 0.794189)}
				Size={UDim2.fromScale(0.925466, 0.0920097)}
				Text={"LIMITED TIME"}
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
					Position={UDim2.fromScale(0.5, 0.421053)}
					Size={UDim2.fromScale(1, 1)}
					Text={"LIMITED TIME"}
					TextColor3={new Color3(1, 1, 1)}
					TextScaled={true}
				>
					<uistroke key={"UIStroke"} Color={Color3.fromRGB(55, 23, 0)} Thickness={2.5} />

					<uigradient
						key={"UIGradient"}
						Color={
							new ColorSequence([
								new ColorSequenceKeypoint(0, Color3.fromRGB(255, 246, 0)),
								new ColorSequenceKeypoint(0.3, Color3.fromRGB(255, 246, 0)),
								new ColorSequenceKeypoint(0.7, Color3.fromRGB(255, 174, 0)),
								new ColorSequenceKeypoint(1, Color3.fromRGB(255, 174, 0)),
							])
						}
						Rotation={90}
					/>
				</textlabel>

				<uistroke key={"UIStroke"} Thickness={3} />

				<uigradient
					key={"UIGradient"}
					Transparency={
						new NumberSequence([new NumberSequenceKeypoint(0, 0.9), new NumberSequenceKeypoint(1, 0.9)])
					}
				/>
			</textlabel>

			<canvasgroup
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				key={"Rays"}
				Position={UDim2.fromScale(0.5, 0.5)}
				Size={UDim2.fromScale(0.968944, 0.975787)}
				ZIndex={0}
			>
				<imagelabel
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Image={"rbxassetid://71706917113952"}
					key={"Rays"}
					Position={UDim2.fromScale(0.5, 0.5)}
					ScaleType={Enum.ScaleType.Fit}
					Size={UDim2.fromScale(1, 1)}
				>
					<uigradient
						key={"UIGradient"}
						Transparency={
							new NumberSequence([
								new NumberSequenceKeypoint(0, 0.67),
								new NumberSequenceKeypoint(1, 0.67),
							])
						}
					/>
				</imagelabel>
			</canvasgroup>

			<imagelabel
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Image={"rbxasset://textures/ui/GuiImagePlaceholder.png"}
				key={"PlaceHolder"}
				Position={UDim2.fromScale(0.5, 0.487893)}
				ScaleType={Enum.ScaleType.Fit}
				Size={UDim2.fromScale(0.465839, 0.363196)}
			/>
		</imagelabel>
	);
}
