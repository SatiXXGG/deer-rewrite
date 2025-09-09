import React from "@rbxts/react";
import RMaxReward from "./maxReward";
import RDayReward from "./day";
import Rewards from ".";
import { GameRewards } from "shared/data/Rewards";

export default function RHolderReward() {
	return (
		<frame
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
			key={"Holder"}
			Position={UDim2.fromScale(0.5, 0.587719)}
			Size={UDim2.fromScale(0.938716, 0.717544)}
		>
			<uilistlayout
				key={"UIListLayout"}
				FillDirection={Enum.FillDirection.Horizontal}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				Padding={new UDim(0.011399, 0)}
				SortOrder={Enum.SortOrder.LayoutOrder}
				VerticalAlignment={Enum.VerticalAlignment.Center}
			/>
			<RMaxReward></RMaxReward>

			<frame
				BackgroundTransparency={1}
				key={"Holder"}
				Position={UDim2.fromScale(0.257108, 0.391051)}
				Size={UDim2.fromScale(0.666321, 1)}
			>
				<uilistlayout
					key={"UIListLayout"}
					Padding={new UDim(0.0189573, 0)}
					SortOrder={Enum.SortOrder.LayoutOrder}
				/>

				<frame BackgroundTransparency={1} key={"Row"} Size={UDim2.fromScale(1, 0.486553)}>
					<uilistlayout
						key={"UIListLayout"}
						FillDirection={Enum.FillDirection.Horizontal}
						Padding={new UDim(0.0171073, 0)}
						SortOrder={Enum.SortOrder.LayoutOrder}
						Wraps={true}
					/>
					{GameRewards.map((info, index) => {
						if (index === 6) return;
						const day = math.clamp(index, 0, 6);
						return <RDayReward day={day}></RDayReward>;
					})}
				</frame>
			</frame>
		</frame>
	);
}
