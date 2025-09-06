import React, { useEffect, useState } from "@rbxts/react";
import RInventorySelected from "./selected";
import { Events, Functions } from "client/network";
import RInventorySlot from "./slot";
import { GameItem } from "shared/types/GameItem";

export default function RInventoryHolder() {
	//* skins got
	const [skins, setSkins] = useState<GameItem[]>(Functions.inventory.getInventoryItems().expect());

	useEffect(() => {
		// solo cargar una vez el inventario
		const conn = Events.inventory.addItem.connect((item) => {
			print(item);
			setSkins((prev) => {
				// si ya existe un item con misma id y class, no cambies el estado
				if (prev.find((i) => i.id === item.id && i.class === item.class)) {
					return prev; // no hace nada → no hay re-render
				}
				return [...prev, item]; // agrega solo si es nuevo
			});
		});
		return () => conn.Disconnect();
	}, []); // 👈 solo al montar

	useEffect(() => {
		print(skins.size());
		print(skins);
	}, [skins]);

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
					{skins.map((skin) => {
						return <RInventorySlot key={skin.id} Class={skin.class} id={skin.id}></RInventorySlot>;
					})}
				</scrollingframe>
			</frame>
			<RInventorySelected></RInventorySelected>
		</frame>
	);
}
