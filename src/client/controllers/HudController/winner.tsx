import React, { useEffect, useState } from "@rbxts/react";
import useWinner from "../hooks/useWinners";
import { Roles } from "shared/types/RoleTags";
import getRole from "shared/utils/getRole";
import { Players } from "@rbxts/services";
import { useSpring } from "@rbxts/pretty-react-hooks";

export default function RWinnerScreen() {
	const { winnerRole, reset, hunters } = useWinner();
	const role = getRole(Players.LocalPlayer);
	const [scale, setScale] = useState(0);
	const scaleMotion = useSpring(scale);

	useEffect(() => {
		if (winnerRole !== Roles.none) {
			setScale(1);
		} else {
			setScale(0);
		}
	});

	return (
		<>
			{winnerRole !== Roles.none && (
				<frame
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={new Color3()}
					BackgroundTransparency={0.35}
					key={"winners"}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={UDim2.fromScale(0.434375, 0.44393)}
				>
					<uicorner key={"UICorner"} CornerRadius={new UDim(0.15, 0)} />

					<textlabel
						BackgroundTransparency={1}
						FontFace={new Font("rbxasset://fonts/families/PermanentMarker.json")}
						key={"title"}
						Position={UDim2.fromScale(0.155875, 0.0354906)}
						RichText={true}
						Size={UDim2.fromScale(0.682254, 0.131524)}
						Text={
							winnerRole === Roles.hunter
								? `<font color='rgb(255, 20,  20)'><b>Hunters</b></font> Won`
								: `<font color='rgb(20, 255,  20)'><b>Deers</b></font> Won`
						}
						TextColor3={new Color3(1, 1, 1)}
						TextScaled={true}
					/>

					{hunters && hunters[0] && (
						<imagelabel
							BackgroundColor3={new Color3()}
							BackgroundTransparency={0.8}
							key={"h1"}
							Position={UDim2.fromScale(0.192448, 0.262112)}
							Size={UDim2.fromScale(0.272967, 0.535383)}
							Image={
								Players.GetUserThumbnailAsync(
									hunters[0].id,
									Enum.ThumbnailType.AvatarBust,
									Enum.ThumbnailSize.Size420x420,
								)[0]
							}
						>
							<uicorner key={"UICorner"} CornerRadius={new UDim(0.2, 0)} />

							<uistroke
								key={"UIStroke"}
								Color={new Color3(1, 1, 1)}
								Thickness={3.1}
								Transparency={0.65}
							/>

							<imagelabel
								BackgroundTransparency={1}
								Image={"rbxassetid://6940288347"}
								key={"eliminated"}
								Position={UDim2.fromScale(0.13834, 0.173045)}
								Size={UDim2.fromScale(0.72332, 0.642105)}
								Visible={!hunters[0].dead}
							/>
						</imagelabel>
					)}

					{hunters && hunters[1] && (
						<imagelabel
							BackgroundColor3={new Color3()}
							BackgroundTransparency={0.8}
							key={"h2"}
							Position={UDim2.fromScale(0.533387, 0.262112)}
							Size={UDim2.fromScale(0.272967, 0.535383)}
							Image={
								Players.GetUserThumbnailAsync(
									hunters[1].id,
									Enum.ThumbnailType.AvatarBust,
									Enum.ThumbnailSize.Size420x420,
								)[0]
							}
						>
							<uicorner key={"UICorner"} CornerRadius={new UDim(0.2, 0)} />

							<uistroke
								key={"UIStroke"}
								Color={new Color3(1, 1, 1)}
								Thickness={3.1}
								Transparency={0.65}
							/>

							<imagelabel
								BackgroundTransparency={1}
								Image={"rbxassetid://6940288347"}
								key={"eliminated"}
								Position={UDim2.fromScale(0.13834, 0.173045)}
								Size={UDim2.fromScale(0.72332, 0.642105)}
								Visible={!hunters[1].dead}
							/>
						</imagelabel>
					)}

					<textbutton
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundColor3={Color3.fromRGB(99, 197, 110)}
						FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
						key={"ok"}
						Position={UDim2.fromScale(0.5, 0.893528)}
						Size={UDim2.fromScale(0.239808, 0.104384)}
						Text={"Ok!"}
						TextColor3={new Color3(1, 1, 1)}
						TextScaled={true}
						Event={{
							Activated: () => {
								reset();
							},
						}}
					>
						<uicorner key={"UICorner"} CornerRadius={new UDim(0.4, 0)} />

						<uistroke
							key={"UIStroke"}
							ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
							Thickness={3.1}
							Transparency={0.65}
						/>

						<uitextsizeconstraint key={"UITextSizeConstraint"} MaxTextSize={30} />

						<uiscale key={"UIScale"} />
					</textbutton>

					<uiscale key={"UIScale"} Scale={scaleMotion} />

					<textlabel
						BackgroundTransparency={1}
						FontFace={new Font("rbxasset://fonts/families/PermanentMarker.json")}
						key={"earn"}
						Position={UDim2.fromScale(0.158273, 0.150313)}
						RichText={true}
						Size={UDim2.fromScale(0.682254, 0.0878821)}
						Text={
							role === winnerRole
								? `You earned <font color="rgb(20, 255,  20)"><b>$200</b></font>`
								: `You earned <font color="rgb(20, 255,  20)"><b>$20</b></font>`
						}
						TextColor3={new Color3(1, 1, 1)}
						TextScaled={true}
					/>
				</frame>
			)}
		</>
	);
}
