import React from "@rbxts/react";
import { ActionsController, DeviceTypeHandler, EInputType } from "@rbxts/input-actions";
import useUserState from "client/controllers/hooks/useState";
import { EPlayerState } from "client/controllers/data/State";
import RHunterContainer from "./container";
import useArrows from "client/controllers/hooks/useArrows";
import useAttribute from "client/controllers/hooks/useAttribute";
import { Players } from "@rbxts/services";

export default function RHunterUi() {
	const device = DeviceTypeHandler.GetMainInputType();
	const player = Players.LocalPlayer;
	const placingTrap = useUserState(EPlayerState.placingTrap);
	const { currentArrows, percentage, isFull } = useArrows();
	const traps = useAttribute(player, "traps", 3) as number;
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
				<RHunterContainer
					icon={"rbxassetid://6977364783"}
					text={`${
						device === EInputType.KeyboardAndMouse ? "F" : device === EInputType.Touch ? "Touch" : "R2"
					} (${traps}/3)`}
					action={() => ActionsController.Press("trap")}
					active={placingTrap}
				></RHunterContainer>

				<imagelabel
					Image={"rbxassetid://93280439275883"}
					BackgroundTransparency={1}
					Size={UDim2.fromScale(0.163912, 0.574718)}
				>
					<textlabel
						Size={UDim2.fromScale(1, 0.5)}
						Text={`${currentArrows}/3`}
						FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
						TextColor3={new Color3(1, 1, 1)}
						BackgroundTransparency={1}
						TextScaled={true}
						AnchorPoint={new Vector2(0.5, 0.5)}
						Position={UDim2.fromScale(0.5, 0.5)}
					>
						<uistroke Thickness={3}></uistroke>
					</textlabel>
					<uigradient
						key={"UIGradient"}
						Offset={new Vector2(-percentage, 0)}
						Enabled={!isFull}
						Color={
							new ColorSequence([
								new ColorSequenceKeypoint(0, Color3.fromRGB(0, 0, 0)),
								new ColorSequenceKeypoint(0.999, Color3.fromRGB(0, 0, 0)),
								new ColorSequenceKeypoint(1, Color3.fromRGB(255, 255, 255)),
							])
						}
					/>
				</imagelabel>
			</frame>
		</frame>
	);
}
