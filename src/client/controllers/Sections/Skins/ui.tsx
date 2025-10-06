import React, { useEffect } from "@rbxts/react";
import RSkinsHeader from "./header";
import RSkinsRowHolder from "./row";
import { BowSkinsInfo, IBowInfo, IBuyableInfo, TauntSkinsInfo, WendigoSkinsInfo } from "shared/data/Skins";
import RShopElement from "./skin";
import Object from "@rbxts/object-utils";
import { Functions } from "client/network";

export default function RSkinsUi() {
	const wendigoMapped: IBuyableInfo[][] = [];
	const bowsMapped: IBowInfo[][] = [];
	const tauntsMapped: IBuyableInfo[][] = [];
	const mapQueue: [IBuyableInfo[][], Record<string, IBuyableInfo>][] = [
		[wendigoMapped, WendigoSkinsInfo],
		[bowsMapped, BowSkinsInfo],
		[tauntsMapped, TauntSkinsInfo],
	];

	mapQueue.forEach(([map, to]) => {
		let currentRow: IBuyableInfo[] = [];
		Object.entries(to).forEach(([index, info]) => {
			currentRow.push(info);
			if (currentRow.size() === 4) {
				map.push(currentRow);
				currentRow = [];
			}
		});

		if (map.size() === 0) {
			map.push(currentRow);
		}
	});

	warn(tauntsMapped, bowsMapped);

	return (
		<imagelabel
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
			Image={"rbxassetid://77105889075760"}
			key={"Skins"}
			Position={UDim2.fromScale(0.5, 0.5)}
			ScaleType={Enum.ScaleType.Fit}
			Size={UDim2.fromScale(1, 1)}
			ZIndex={2}
		>
			<frame
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				ClipsDescendants={true}
				key={"Holder"}
				Position={UDim2.fromScale(0.5, 0.587719)}
				Size={UDim2.fromScale(0.940367, 0.743816)}
			>
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
					Size={UDim2.fromScale(1, 0.984009)}
					TopImage={"rbxassetid://132456408835496"}
				>
					<uilistlayout
						key={"UIListLayout"}
						HorizontalAlignment={Enum.HorizontalAlignment.Center}
						Padding={new UDim(0.0717828, 0)}
						SortOrder={Enum.SortOrder.LayoutOrder}
					/>
					{wendigoMapped.map((row) => (
						<RSkinsRowHolder>
							{row.map((info) => {
								return <RShopElement info={info}></RShopElement>;
							})}
						</RSkinsRowHolder>
					))}

					{bowsMapped.map((row) => (
						<RSkinsRowHolder>
							{row.map((info) => {
								return <RShopElement info={info}></RShopElement>;
							})}
						</RSkinsRowHolder>
					))}

					{tauntsMapped.map((row) => (
						<RSkinsRowHolder>
							{row.map((info) => {
								return <RShopElement info={info}></RShopElement>;
							})}
						</RSkinsRowHolder>
					))}
				</scrollingframe>
			</frame>

			<RSkinsHeader></RSkinsHeader>

			<uiaspectratioconstraint key={"UIAspectRatioConstraint"} AspectRatio={1.81086} />
		</imagelabel>
	);
}
