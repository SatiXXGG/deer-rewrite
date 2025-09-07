import React, { useEffect } from "@rbxts/react";
import { ActionsController, DeviceTypeHandler, EInputType } from "@rbxts/input-actions";
import RWendigoContainer from "./container";
import useUserState from "client/controllers/hooks/useState";
import { EPlayerState } from "client/controllers/data/State";

interface Props {
	hunger?: number;
}

export default function RWendigoUi() {
	const device = DeviceTypeHandler.GetMainInputType();
	const attacking = useUserState(EPlayerState.attacking);
	const screaming = useUserState(EPlayerState.screaming);

	return (
		<frame
			AnchorPoint={new Vector2(1, 0)}
			BackgroundTransparency={1}
			key={"stats"}
			Position={UDim2.fromScale(0.4, 0.65)}
			Size={UDim2.fromScale(0.389172, 0.197469)}
		>
			<uiaspectratioconstraint key={"UIAspectRatioConstraint"} AspectRatio={3.5} />
			<frame
				BackgroundTransparency={1}
				key={"buttons"}
				Position={UDim2.fromScale(0.1, 0.5)}
				Size={UDim2.fromScale(0.941849, 0.845249)}
			>
				<uigridlayout
					key={"UIGridLayout"}
					CellPadding={UDim2.fromOffset(20, 5)}
					CellSize={UDim2.fromScale(0.2, 0.8)}
					SortOrder={Enum.SortOrder.LayoutOrder}
				/>
				<RWendigoContainer
					icon={"rbxassetid://75597416029667"}
					text={device === EInputType.KeyboardAndMouse ? "LMB" : device === EInputType.Touch ? "Touch" : "R2"}
					action={() => ActionsController.Press("attack")}
					active={attacking}
				></RWendigoContainer>
				<RWendigoContainer
					icon={"rbxassetid://83604397264149"}
					text={device === EInputType.KeyboardAndMouse ? "T" : device === EInputType.Touch ? "Touch" : "Y"}
					action={() => ActionsController.Press("taunt")}
					active={screaming}
				></RWendigoContainer>
			</frame>

			{/** Mobile button */}
			{device === EInputType.Touch && (
				<textbutton
					Size={UDim2.fromScale(0.3, 1)}
					BackgroundColor3={Color3.fromRGB(252, 26, 26)}
					Position={UDim2.fromScale(2.3, -0.1)}
					BackgroundTransparency={0.5}
					Text={"ATTACK"}
					FontFace={new Font("rbxasset://fonts/families/SourceSansPro.json")}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextScaled={true}
					Event={{
						MouseButton1Down: () => {
							ActionsController.Press("attack");
						},
						MouseButton1Up: () => {
							ActionsController.Release("attack");
						},
					}}
				>
					<uicorner CornerRadius={new UDim(1, 0)}></uicorner>
					<uitextsizeconstraint MaxTextSize={50}></uitextsizeconstraint>
				</textbutton>
			)}
		</frame>
	);
}
