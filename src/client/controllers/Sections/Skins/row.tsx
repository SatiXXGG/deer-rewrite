import React from "@rbxts/react";
import RSkinsRow from "./rowSkins";
import RSkinsLimited from "./limited";

interface Props {
	children?: React.Element[];
}

export default function RSkinsRowHolder(props: Props) {
	const children = props.children ?? [];
	const r1 = children.filter((_, i) => i < 3);
	const r2 = children.filter((_, i) => i >= 3);

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
			<RSkinsLimited></RSkinsLimited>

			<frame BackgroundTransparency={1} LayoutOrder={2} key={"Holder"} Size={UDim2.fromScale(0.648225, 1)}>
				<uilistlayout
					key={"UIListLayout"}
					Padding={new UDim(0.0363196, 0)}
					SortOrder={Enum.SortOrder.LayoutOrder}
				/>
				<RSkinsRow>{r1}</RSkinsRow>
				<RSkinsRow>{r2}</RSkinsRow>
			</frame>
		</frame>
	);
}
