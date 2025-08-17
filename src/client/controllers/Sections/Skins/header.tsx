import React from "@rbxts/react";
import RCloseButton from "client/controllers/Elements/CloseButton";

export default function RSkinsHeader() {
	return (
		<frame
			AnchorPoint={new Vector2(0.5, 0)}
			BackgroundTransparency={1}
			key={"Header"}
			Position={UDim2.fromScale(0.5, 0.0473312)}
			Size={UDim2.fromScale(0.926499, 0.150613)}
		>
			<RCloseButton
				key={"Exit"}
				Position={UDim2.fromScale(1, 0.5)}
				Size={UDim2.fromScale(0.0897704, 1)}
			></RCloseButton>

			<frame
				AnchorPoint={new Vector2(0, 0.5)}
				BackgroundColor3={new Color3()}
				BackgroundTransparency={0.66}
				key={"Banner"}
				Position={UDim2.fromScale(0, 0.5)}
				Size={UDim2.fromScale(0.530271, 0.94186)}
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
					LayoutOrder={1}
					key={"Txt"}
					Position={UDim2.fromScale(0.566489, 0.5)}
					Size={UDim2.fromScale(0.82874, 0.802469)}
					Text={"SKINS"}
					TextColor3={new Color3(1, 1, 1)}
					TextScaled={true}
					TextXAlignment={Enum.TextXAlignment.Left}
				>
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

				<uicorner key={"UICorner"} CornerRadius={new UDim(0.0987654, 0)} />

				<imagelabel
					BackgroundTransparency={1}
					Image={"rbxassetid://123955588843734"}
					key={"Star"}
					ScaleType={Enum.ScaleType.Fit}
					Size={UDim2.fromScale(0.151575, 0.925926)}
				/>

				<uilistlayout
					key={"UIListLayout"}
					FillDirection={Enum.FillDirection.Horizontal}
					SortOrder={Enum.SortOrder.LayoutOrder}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
			</frame>
		</frame>
	);
}
