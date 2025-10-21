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
		<imagebutton
			Visible={winnerRole !== Roles.none}
			Active={false}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
			Image={winnerRole !== Roles.deer ? "rbxassetid://117171603200564" : "rbxassetid://114115751374732"}
			key={"winners"}
			Position={UDim2.fromScale(0.499629, 0.5)}
			Selectable={false}
			Size={UDim2.fromScale(0.567263, 0.44393)}
		>
			<textlabel
				BackgroundTransparency={1}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
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
					BackgroundTransparency={1}
					Image={
						Players.GetUserThumbnailAsync(
							hunters[0].id,
							Enum.ThumbnailType.AvatarThumbnail,
							Enum.ThumbnailSize.Size420x420,
						)[0]
					}
					key={"h1"}
					Position={UDim2.fromScale(0.192448, 0.262112)}
					ScaleType={Enum.ScaleType.Crop}
					Size={UDim2.fromScale(0.272967, 0.535383)}
				>
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
					BackgroundTransparency={1}
					Image={
						Players.GetUserThumbnailAsync(
							hunters[1].id,
							Enum.ThumbnailType.AvatarThumbnail,
							Enum.ThumbnailSize.Size420x420,
						)[0]
					}
					key={"h2"}
					Position={UDim2.fromScale(0.533387, 0.262112)}
					ScaleType={Enum.ScaleType.Crop}
					Size={UDim2.fromScale(0.272967, 0.535383)}
				>
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
				BackgroundColor3={Color3.fromRGB(255, 52, 51)}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				key={"ok"}
				Position={UDim2.fromScale(0.990771, 0.0271018)}
				Size={UDim2.fromScale(0.0696738, 0.141628)}
				Text={"X"}
				TextColor3={new Color3(1, 1, 1)}
				TextScaled={true}
				Event={{
					Activated: () => reset(),
				}}
			>
				<uicorner key={"UICorner"} CornerRadius={new UDim(0.4, 0)} />

				<uistroke
					key={"UIStroke"}
					ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
					Color={Color3.fromRGB(163, 64, 53)}
					Thickness={3.1}
				/>

				<uitextsizeconstraint key={"UITextSizeConstraint"} MaxTextSize={30} />

				<uiscale key={"UIScale"} />
			</textbutton>

			<uiscale key={"UIScale"} />

			<textlabel
				BackgroundTransparency={1}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
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

			<frame
				BackgroundTransparency={1}
				key={"buttons"}
				Position={UDim2.fromScale(-0.00130864, 1.01834)}
				Size={UDim2.fromScale(0.999865, 0.154617)}
			>
				<frame
					key={"Frame"}
					BackgroundColor3={Color3.fromRGB(80, 81, 81)}
					BackgroundTransparency={0.45}
					Size={UDim2.fromOffset(100, 100)}
				>
					<uicorner key={"UICorner"} CornerRadius={new UDim(0.2, 0)} />

					<textlabel
						key={"TextLabel"}
						BackgroundTransparency={1}
						FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
						Position={UDim2.fromScale(0.253054, 0.172414)}
						Size={UDim2.fromOffset(152, 38)}
						Text={role === winnerRole ? "$200" : "$20"}
						TextColor3={new Color3(1, 1, 1)}
						TextScaled={true}
					>
						<uistroke key={"UIStroke"} Thickness={3} />
					</textlabel>

					<imagebutton
						key={"ImageButton"}
						BackgroundTransparency={1}
						Image={"rbxassetid://117385885357806"}
						Position={UDim2.fromScale(0.04363, 0.0862069)}
						Size={UDim2.fromOffset(48, 48)}
					/>
				</frame>

				<uigridlayout
					key={"UIGridLayout"}
					CellSize={UDim2.fromScale(0.3, 1)}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					SortOrder={Enum.SortOrder.LayoutOrder}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
			</frame>
		</imagebutton>
	);
}
