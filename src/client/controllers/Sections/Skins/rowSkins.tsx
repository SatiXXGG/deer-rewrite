import React from "@rbxts/react";

interface Props {
	children?: React.Element[];
}

export default function RSkinsRow(props: Props) {
	return (
		<frame BackgroundTransparency={1} key={"Row"} Size={UDim2.fromScale(1, 0.48184)}>
			<uilistlayout
				key={"UIListLayout"}
				FillDirection={Enum.FillDirection.Horizontal}
				Padding={new UDim(0.0241546, 0)}
				SortOrder={Enum.SortOrder.LayoutOrder}
				VerticalAlignment={Enum.VerticalAlignment.Center}
			/>
			{props.children}
		</frame>
	);
}
