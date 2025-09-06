import React, { useEffect } from "@rbxts/react";
import RDeerContainer from "./container";
import { ActionsController, DeviceTypeHandler, EInputDeviceType, EInputType } from "@rbxts/input-actions";
import useHunger from "client/controllers/hooks/useHunger";

interface Props {
	hunger?: number;
}

export default function RDeerUi({ hunger }: Props = { hunger: 2000 }) {
	const device = DeviceTypeHandler.GetMainInputType();
	const { hunger: currentHunger, percentage } = useHunger(hunger ?? 1000);

	useEffect(() => {
		print(percentage);
	}, [percentage]);

	return (
		<frame
			AnchorPoint={new Vector2(1, 0)}
			BackgroundTransparency={1}
			key={"stats"}
			Position={UDim2.fromScale(0.4, 0.781717)}
			Size={UDim2.fromScale(0.389172, 0.197469)}
		>
			<uiaspectratioconstraint key={"UIAspectRatioConstraint"} AspectRatio={3.5} />

			<imagelabel
				BackgroundTransparency={1}
				Image={"rbxassetid://78541087281123"}
				key={"hunger"}
				Position={UDim2.fromScale(0.019006, 0.368251)}
				ScaleType={Enum.ScaleType.Crop}
				Size={UDim2.fromScale(0.669656, 0.506767)}
			>
				<imagelabel
					BackgroundTransparency={1}
					Image={"rbxassetid://116611305225906"}
					key={"bar"}
					Position={UDim2.fromScale(0.0296633, -0.107655)}
					ScaleType={Enum.ScaleType.Crop}
					Size={UDim2.fromScale(0.940541, 0.9375)}
				>
					<uigradient
						key={"UIGradient"}
						Offset={new Vector2(percentage - 1, 0)}
						Transparency={
							new NumberSequence([
								new NumberSequenceKeypoint(0, 0),
								new NumberSequenceKeypoint(0.999, 0.0188),
								new NumberSequenceKeypoint(1, 1),
							])
						}
					/>
				</imagelabel>
			</imagelabel>

			<frame
				BackgroundTransparency={1}
				key={"buttons"}
				Position={UDim2.fromScale(0.743819, 0.194407)}
				Size={UDim2.fromScale(0.941849, 0.845249)}
			>
				<uigridlayout
					key={"UIGridLayout"}
					CellPadding={UDim2.fromOffset(20, 5)}
					CellSize={UDim2.fromScale(0.2, 0.8)}
					SortOrder={Enum.SortOrder.LayoutOrder}
				/>
				<RDeerContainer
					action={() => {
						ActionsController.Press("eat");
					}}
					key={"eat"}
					icon={"rbxassetid://118217308147250"}
					text={device === EInputType.Gamepad ? "X" : device === EInputType.Touch ? "Touch" : "E"}
				></RDeerContainer>
				<RDeerContainer
					key={"taunt"}
					icon={"rbxassetid://86411530791856"}
					text={device === EInputType.Gamepad ? "Y" : device === EInputType.Touch ? "Touch" : "T"}
				></RDeerContainer>
				<RDeerContainer
					key={"locate"}
					icon={"rbxassetid://98723517971757"}
					text={device === EInputType.Gamepad ? "B" : device === EInputType.Touch ? "Touch" : "Q"}
				></RDeerContainer>
			</frame>
		</frame>
	);
}
