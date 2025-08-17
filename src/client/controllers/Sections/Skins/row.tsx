import React from "@rbxts/react";

export default function RSkinsRow() {
	return (
		<frame BackgroundTransparency={1} key={"Holder1"} Size={UDim2.fromScale(0.985253, 0.98821)}>
			<uilistlayout
				key={"UIListLayout"}
				FillDirection={Enum.FillDirection.Horizontal}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				Padding={new UDim(0.0156576, 0)}
				SortOrder={Enum.SortOrder.LayoutOrder}
				VerticalAlignment={Enum.VerticalAlignment.Center}
			/>

			<frame BackgroundTransparency={1} LayoutOrder={2} key={"Holder"} Size={UDim2.fromScale(0.648225, 1)}>
				<uilistlayout
					key={"UIListLayout"}
					Padding={new UDim(0.0363196, 0)}
					SortOrder={Enum.SortOrder.LayoutOrder}
				/>
			</frame>
		</frame>
	);
}
