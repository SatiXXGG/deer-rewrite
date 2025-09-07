import React, { useContext, useEffect, useState } from "@rbxts/react";
import ROpenedContext from "client/context/currentOpen";
import useAttribute from "../hooks/useAttribute";
import { Players } from "@rbxts/services";

export default function RButtonContainer({ children }: { children: React.Element | React.Element[] }) {
	const context = useContext(ROpenedContext);
	const [visible, setVisible] = useState(false);
	const cash = useAttribute(Players.LocalPlayer, "cash", 0);

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
			<imagelabel
				BackgroundTransparency={1}
				Image={"rbxassetid://129833160145245"}
				key={"cash"}
				ScaleType={Enum.ScaleType.Fit}
				Size={UDim2.fromScale(0.291262, 0.428)}
			>
				<imagelabel
					AnchorPoint={new Vector2(1, 0.5)}
					BackgroundTransparency={1}
					Image={"rbxassetid://117385885357806"}
					key={"Icon"}
					Position={UDim2.fromScale(0.95, 0.5)}
					ScaleType={Enum.ScaleType.Fit}
					Size={UDim2.fromScale(0.223333, 0.626168)}
				/>

				<textlabel
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					FontFace={
						new Font(
							"rbxasset://fonts/families/GothamSSm.json",
							Enum.FontWeight.ExtraBold,
							Enum.FontStyle.Normal,
						)
					}
					key={"current"}
					Position={UDim2.fromScale(0.394902, 0.5)}
					Size={UDim2.fromScale(0.66353, 0.502266)}
					Text={`$${cash}`}
					TextColor3={new Color3(1, 1, 1)}
					TextScaled={true}
				>
					<uistroke key={"UIStroke"} Thickness={3} />
				</textlabel>
			</imagelabel>

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
