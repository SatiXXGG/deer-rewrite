import { useSpring } from "@rbxts/pretty-react-hooks";
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
	const [scale, setScale] = useState(1);
	const [rot, setRot] = useState(0);

	const springScale = useSpring(scale);
	const springRot = useSpring(rot);

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
				MouseEnter: () => {
					setScale(1.1);
					setRot(12);
				},
				MouseLeave: () => {
					setScale(1);
					setRot(0);
				},
			}}
		>
			<viewportframe BackgroundTransparency={1} key={"preview"} Size={UDim2.fromScale(1, 1)} />
			<ObjectViewport
				Native={{
					Size: UDim2.fromScale(1, 1),
					BackgroundTransparency: 1,
					AnchorPoint: new Vector2(0.5, 0.5),
					Position: UDim2.fromScale(0.5, 0.5),
					Rotation: springRot,
				}}
				Object={preview}
				cf={preview.GetPivot().mul(getClassCf(Class))}
			>
				<uiscale Scale={springScale}></uiscale>
			</ObjectViewport>
			<imagelabel
				BackgroundTransparency={1}
				key={"img"}
				Position={UDim2.fromScale(0.180785, 0.180785)}
				Size={UDim2.fromOffset(52, 52)}
				Rotation={springRot}
			/>
		</imagebutton>
	);
}
