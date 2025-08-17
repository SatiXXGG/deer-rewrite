import React from "@rbxts/react";

export default function RQuestPrize() {
	return (
		<frame
			AnchorPoint={new Vector2(1, 0.5)}
			BackgroundColor3={new Color3()}
			BackgroundTransparency={0.5}
			LayoutOrder={3}
			key={"PrizeHolder"}
			Position={UDim2.fromScale(0.971751, 0.5)}
			Size={UDim2.fromScale(0.160075, 0.697248)}
		>
			<uicorner key={"UICorner"} CornerRadius={new UDim(0.0526316, 0)} />

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
				key={"Txt"}
				Position={UDim2.fromScale(0.5, 0.960526)}
				Size={UDim2.fromScale(1, 0.223684)}
				Text={"100x Cash"}
				TextColor3={new Color3(1, 1, 1)}
				TextScaled={true}
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

			<imagelabel
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Image={"rbxasset://textures/ui/GuiImagePlaceholder.png"}
				key={"Icon"}
				Position={UDim2.fromScale(0.5, 0.394737)}
				ScaleType={Enum.ScaleType.Fit}
				Size={UDim2.fromScale(0.705882, 0.657895)}
				ZIndex={0}
			/>
		</frame>
	);
}
