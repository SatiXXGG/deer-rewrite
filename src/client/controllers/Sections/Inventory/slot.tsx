import React, { useContext, useEffect, useState } from "@rbxts/react";
import RInventoryContext, { InventoryIds } from "client/context/inventorySelected";
import ObjectViewport from "client/controllers/Elements/ObjectViewport";
import getClassCf from "client/utils/getClassCf";
import { Containers } from "shared/data/Skins";
import { EItemClass } from "shared/types/GameItem";

interface IProps {
	Class: EItemClass;
	id: string;
}

export default function RInventorySlot({ Class, id }: IProps) {
	const container = Containers[Class];
	const preview = container.FindFirstChild(id)!.Clone() as Model;
	const context = useContext(RInventoryContext);
	return (
		<imagebutton
			BackgroundTransparency={1}
			Image={"rbxassetid://136200029712336"}
			ScaleType={Enum.ScaleType.Fit}
			Size={UDim2.fromOffset(100, 100)}
			Event={{
				Activated: () => {
					if (context) {
						context.setClass(Class);
						context.setSelected(id as InventoryIds);
					}
				},
			}}
		>
			<viewportframe BackgroundTransparency={1} key={"preview"} Size={UDim2.fromScale(1, 1)} />
			<ObjectViewport
				Native={{ Size: UDim2.fromScale(1, 1), BackgroundTransparency: 1 }}
				Object={preview}
				cf={preview.GetPivot().mul(getClassCf(Class))}
			></ObjectViewport>
			<imagelabel
				BackgroundTransparency={1}
				key={"img"}
				Position={UDim2.fromScale(0.180785, 0.180785)}
				Size={UDim2.fromOffset(52, 52)}
			/>
		</imagebutton>
	);
}
