import React, { Ref } from "@rbxts/react";
import RQuestHeader from "./header";
import RQuestDaily from "./daily";
import RQuestWeekly from "./weekly";

interface Props {
	ref: Ref<ImageLabel>;
}
export default function RQuestsUi(props: Props) {
	return (
		<imagelabel
			ref={props.ref}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
			Image={"rbxassetid://139895220411161"}
			key={"Quests"}
			Position={UDim2.fromScale(0.5, 0.5)}
			ScaleType={Enum.ScaleType.Fit}
			Size={UDim2.fromScale(1, 1)}
		>
			<frame
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				key={"Holder"}
				Position={UDim2.fromScale(0.5, 0.587719)}
				Size={UDim2.fromScale(0.945148, 0.733898)}
			>
				<uilistlayout
					key={"UIListLayout"}
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					Padding={new UDim(0.0178571, 0)}
					SortOrder={Enum.SortOrder.LayoutOrder}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
				<RQuestDaily></RQuestDaily>
				<RQuestWeekly></RQuestWeekly>
			</frame>
			<RQuestHeader></RQuestHeader>

			<uiaspectratioconstraint key={"UIAspectRatioConstraint"} AspectRatio={2.00847} />
		</imagelabel>
	);
}
