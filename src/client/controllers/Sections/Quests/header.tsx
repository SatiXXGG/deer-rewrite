import React, { useContext } from "@rbxts/react";
import ROpenedContext from "client/context/currentOpen";
import RCloseButton from "client/controllers/Elements/CloseButton";

export default function RQuestHeader() {
	const context = useContext(ROpenedContext);
	return (
		<frame
			AnchorPoint={new Vector2(0.5, 0)}
			BackgroundTransparency={1}
			key={"Header"}
			Position={UDim2.fromScale(0.5, 0.0526316)}
			Size={UDim2.fromScale(0.945148, 0.145763)}
		>
			<RCloseButton
				key={"Exit"}
				Position={UDim2.fromScale(1, 0.5)}
				Size={UDim2.fromScale(0.075, 0.976744)}
			></RCloseButton>

			<frame
				AnchorPoint={new Vector2(0, 0.5)}
				BackgroundColor3={new Color3()}
				BackgroundTransparency={0.66}
				key={"Banner"}
				Position={UDim2.fromScale(0, 0.5)}
				Size={UDim2.fromScale(0.259821, 0.953488)}
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
					Text={"QUESTS"}
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
				Size={UDim2.fromScale(0.239286, 0.767442)}
				Text={"24:23:17"}
				TextColor3={new Color3(1, 1, 1)}
				TextScaled={true}
				Visible={false}
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
