import React from "@rbxts/react";

export default function RInventorySide() {
	return (
		<frame
			AnchorPoint={new Vector2(1, 0.5)}
			BackgroundColor3={new Color3(1, 1, 1)}
			BackgroundTransparency={0.999}
			BorderColor3={new Color3()}
			BorderSizePixel={0}
			key={"SideButtons"}
			Position={UDim2.fromScale(-0.0290416, 0.571875)}
			Size={UDim2.fromScale(0.254598, 0.628125)}
		>
			<uilistlayout
				key={"UIListLayout"}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				Padding={new UDim(0.0373134, 0)}
				SortOrder={Enum.SortOrder.LayoutOrder}
			/>

			<frame BackgroundTransparency={1} LayoutOrder={3} key={"Row3"} Size={UDim2.fromScale(1, 0.308458)}>
				<uilistlayout
					key={"UIListLayout"}
					FillDirection={Enum.FillDirection.Horizontal}
					Padding={new UDim(0.0570342, 0)}
					SortOrder={Enum.SortOrder.LayoutOrder}
				/>

				<imagebutton
					BackgroundTransparency={1}
					Image={"rbxassetid://75746562801921"}
					LayoutOrder={1}
					key={"1"}
					ScaleType={Enum.ScaleType.Fit}
					Size={UDim2.fromScale(0.471483, 1)}
				/>

				<imagebutton
					BackgroundTransparency={1}
					Image={"rbxassetid://75746562801921"}
					LayoutOrder={2}
					key={"2"}
					ScaleType={Enum.ScaleType.Fit}
					Size={UDim2.fromScale(0.471483, 1)}
				/>
			</frame>

			<frame BackgroundTransparency={1} LayoutOrder={2} key={"Row2"} Size={UDim2.fromScale(1, 0.308458)}>
				<uilistlayout
					key={"UIListLayout"}
					FillDirection={Enum.FillDirection.Horizontal}
					Padding={new UDim(0.0570342, 0)}
					SortOrder={Enum.SortOrder.LayoutOrder}
				/>

				<imagebutton
					BackgroundTransparency={1}
					Image={"rbxassetid://75746562801921"}
					LayoutOrder={1}
					key={"1"}
					ScaleType={Enum.ScaleType.Fit}
					Size={UDim2.fromScale(0.471483, 1)}
				/>

				<imagebutton
					BackgroundTransparency={1}
					Image={"rbxassetid://75746562801921"}
					LayoutOrder={2}
					key={"2"}
					ScaleType={Enum.ScaleType.Fit}
					Size={UDim2.fromScale(0.471483, 1)}
				/>
			</frame>

			<frame BackgroundTransparency={1} LayoutOrder={1} key={"Row1"} Size={UDim2.fromScale(1, 0.308458)}>
				<uilistlayout
					key={"UIListLayout"}
					FillDirection={Enum.FillDirection.Horizontal}
					Padding={new UDim(0.0570342, 0)}
					SortOrder={Enum.SortOrder.LayoutOrder}
				/>

				<imagebutton
					BackgroundTransparency={1}
					Image={"rbxassetid://75746562801921"}
					LayoutOrder={2}
					key={"2"}
					ScaleType={Enum.ScaleType.Fit}
					Size={UDim2.fromScale(0.471483, 1)}
				/>

				<imagebutton
					BackgroundTransparency={1}
					Image={"rbxassetid://75746562801921"}
					LayoutOrder={1}
					key={"1"}
					ScaleType={Enum.ScaleType.Fit}
					Size={UDim2.fromScale(0.471483, 1)}
				/>
			</frame>
		</frame>
	);
}
