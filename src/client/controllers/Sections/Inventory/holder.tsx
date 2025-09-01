import React from "@rbxts/react";
import RInventorySelected from "./selected";

export default function RInventoryHolder() {
	return (
		<frame
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
			key={"Holder"}
			Position={UDim2.fromScale(0.5, 0.572094)}
			Size={UDim2.fromScale(0.927396, 0.753125)}
		>
			<uilistlayout
				key={"UIListLayout"}
				FillDirection={Enum.FillDirection.Horizontal}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				Padding={new UDim(0.0156576, 0)}
				SortOrder={Enum.SortOrder.LayoutOrder}
				VerticalAlignment={Enum.VerticalAlignment.Center}
			/>

			<frame BackgroundTransparency={1} ClipsDescendants={true} key={"Slots"} Size={UDim2.fromScale(0.676409, 1)}>
				<scrollingframe
					AnchorPoint={new Vector2(0.5, 0)}
					AutomaticCanvasSize={Enum.AutomaticSize.Y}
					BackgroundTransparency={1}
					BottomImage={"rbxassetid://93079608146987"}
					CanvasSize={new UDim2()}
					ClipsDescendants={false}
					MidImage={"rbxassetid://103921755022681"}
					key={"Scroller"}
					Position={UDim2.fromScale(0.5, 0)}
					ScrollBarImageTransparency={1}
					ScrollBarThickness={0}
					ScrollingDirection={Enum.ScrollingDirection.Y}
					Size={UDim2.fromScale(1, 0.958506)}
					TopImage={"rbxassetid://132456408835496"}
				>
					<uigridlayout
						key={"UIGridLayout"}
						CellPadding={UDim2.fromScale(0.0216049, 0.030303)}
						CellSize={UDim2.fromScale(0.233025, 0.32684)}
						SortOrder={Enum.SortOrder.LayoutOrder}
					>
						<uiaspectratioconstraint key={"UIAspectRatioConstraint"} />
					</uigridlayout>
				</scrollingframe>
			</frame>
			<RInventorySelected></RInventorySelected>
		</frame>
	);
}
