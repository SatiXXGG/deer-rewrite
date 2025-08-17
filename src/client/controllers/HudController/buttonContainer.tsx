import React, { useContext, useEffect, useState } from "@rbxts/react";
import ROpenedContext from "client/context/currentOpen";

export default function RButtonContainer({ children }: { children: React.Element | React.Element[] }) {
	const context = useContext(ROpenedContext);
	const [visible, setVisible] = useState(false);

	if (context) {
		useEffect(() => {
			if (context.opened === undefined || context.opened === "none") {
				setVisible(true);
			} else {
				setVisible(false);
			}
		}, [context.opened]);
	}

	return (
		<frame
			AnchorPoint={new Vector2(0.5, 1)}
			BackgroundTransparency={1}
			key={"sections"}
			Position={UDim2.fromScale(0.5, 0.925857)}
			Size={UDim2.fromScale(0.536458, 0.231696)}
			Visible={visible}
		>
			<uilistlayout
				key={"UIListLayout"}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				Padding={new UDim(0.08, 0)}
				SortOrder={Enum.SortOrder.LayoutOrder}
				VerticalAlignment={Enum.VerticalAlignment.Bottom}
			/>

			<uiaspectratioconstraint key={"UIAspectRatioConstraint"} AspectRatio={4.12} />

			<frame BackgroundTransparency={1} LayoutOrder={2} key={"Buttons"} Size={UDim2.fromScale(1, 0.492)}>
				<uilistlayout
					key={"UIListLayout"}
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					Padding={new UDim(0.0135922, 0)}
					SortOrder={Enum.SortOrder.LayoutOrder}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>

				{children}
			</frame>
		</frame>
	);
}
