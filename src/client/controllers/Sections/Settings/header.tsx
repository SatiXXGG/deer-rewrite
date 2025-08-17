import React from "@rbxts/react";
import RCloseButton from "client/controllers/Elements/CloseButton";

export default function RSettingsHeader() {
	return (
		<frame
			AnchorPoint={new Vector2(0.5, 0)}
			BackgroundTransparency={1}
			key={"Header"}
			Position={UDim2.fromScale(0.5, 0.0374065)}
			Size={UDim2.fromScale(0.937845, 0.124688)}
		>
			<RCloseButton
				key={"Exit"}
				Position={UDim2.fromScale(1, 0.5)}
				Size={UDim2.fromScale(0.147275, 1)}
			></RCloseButton>

			<frame
				AnchorPoint={new Vector2(0, 0.5)}
				BackgroundColor3={new Color3()}
				BackgroundTransparency={0.66}
				key={"Banner"}
				Position={UDim2.fromScale(0, 0.5)}
				Size={UDim2.fromScale(0.653903, 1)}
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
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={UDim2.fromScale(1, 0.914198)}
					Text={"SETTINGS"}
					TextColor3={new Color3(1, 1, 1)}
					TextScaled={true}
				>
					<uigradient
						key={"UIGradient"}
						Color={
							new ColorSequence([
								new ColorSequenceKeypoint(0, new Color3(1, 1, 1)),
								new ColorSequenceKeypoint(0.5, Color3.fromRGB(204, 204, 204)),
								new ColorSequenceKeypoint(1, Color3.fromRGB(153, 153, 153)),
							])
						}
						Rotation={90}
					/>
				</textlabel>

				<uicorner key={"UICorner"} CornerRadius={new UDim(0.0963855, 0)} />
			</frame>
		</frame>
	);
}
