import React from "@rbxts/react";
import RCloseButton from "client/controllers/Elements/CloseButton";

export default function RHeaderReward() {
	return (
		<frame
			AnchorPoint={new Vector2(0.5, 0)}
			BackgroundTransparency={1}
			key={"Header"}
			Position={UDim2.fromScale(0.5, 0.0526316)}
			Size={UDim2.fromScale(0.938716, 0.147368)}
		>
			<RCloseButton
				key={"Exit"}
				Position={UDim2.fromScale(1, 0.5)}
				Size={UDim2.fromScale(0.0880829, 1.0119)}
			></RCloseButton>

			<frame
				AnchorPoint={new Vector2(0, 0.5)}
				BackgroundColor3={new Color3()}
				BackgroundTransparency={0.66}
				key={"Banner"}
				Position={UDim2.fromScale(0, 0.5)}
				Size={UDim2.fromScale(0.584456, 0.964286)}
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
					Size={UDim2.fromScale(1, 0.864198)}
					Text={"DAILY REWARDS"}
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

				<uicorner key={"UICorner"} CornerRadius={new UDim(0.0987654, 0)} />
			</frame>

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
				Position={UDim2.fromScale(0.75, 0.5)}
				Size={UDim2.fromScale(0.278756, 0.797619)}
				Text={"24:23:17"}
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
		</frame>
	);
}
