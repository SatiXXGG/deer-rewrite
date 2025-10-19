import { useUnmountEffect } from "@rbxts/pretty-react-hooks";
import React, { useContext, useEffect, useState } from "@rbxts/react";
import ROpenedContext from "client/context/currentOpen";
import AnimatedWindow from "client/controllers/Elements/AnimatedWindow";
import useSpectate from "client/controllers/hooks/useSpectate";

export default function RSpectate() {
	const [isOpen, setOpen] = useState(true);
	const context = useContext(ROpenedContext);
	const { NextUser, prev, name, reset } = useSpectate();
	useEffect(() => {
		if (context) {
			if (context.opened === "Spectate") {
				setOpen(true);
			} else {
				setOpen(false);
				reset();
			}
		}
	}, [context?.opened]);

	useUnmountEffect(() => {
		reset();
	});

	return (
		<AnimatedWindow
			anchorPoint={new Vector2(0.5, 0)}
			size={UDim2.fromScale(0.319792, 0.122335)}
			position={UDim2.fromScale(0.5, 0.0741427)}
			isOpen={isOpen}
		>
			<frame
				BackgroundTransparency={1}
				key={"spectate"}
				Position={UDim2.fromScale(0, 0)}
				Size={UDim2.fromScale(1, 1)}
			>
				<uilistlayout
					key={"UIListLayout"}
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					Padding={new UDim(0.0276873, 0)}
					SortOrder={Enum.SortOrder.LayoutOrder}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>

				<imagelabel
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Image={"rbxassetid://118147849616204"}
					LayoutOrder={2}
					key={"Player"}
					ScaleType={Enum.ScaleType.Fit}
					Size={UDim2.fromScale(0.703583, 1)}
				>
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
						key={"Name"}
						Position={UDim2.fromScale(0.5, 0.5)}
						Size={UDim2.fromScale(1, 0.530303)}
						Text={name}
						TextColor3={new Color3(1, 1, 1)}
						TextScaled={true}
					>
						<uistroke key={"UIStroke"} Thickness={4} />
					</textlabel>
				</imagelabel>

				<imagebutton
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Image={"rbxassetid://111776745504485"}
					LayoutOrder={1}
					key={"Left"}
					ScaleType={Enum.ScaleType.Fit}
					Size={UDim2.fromScale(0.120521, 0.560606)}
					Event={{
						Activated: () => NextUser(),
					}}
				>
					<imagelabel
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundTransparency={1}
						Image={"rbxassetid://120523560814457"}
						key={"Icon"}
						Position={UDim2.fromScale(0.459459, 0.527027)}
						ScaleType={Enum.ScaleType.Fit}
						Size={UDim2.fromScale(0.594595, 0.662162)}
					/>

					<uiscale key={"UIScale"} />
				</imagebutton>

				<imagebutton
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Image={"rbxassetid://111776745504485"}
					LayoutOrder={3}
					key={"Right"}
					ScaleType={Enum.ScaleType.Fit}
					Size={UDim2.fromScale(0.120521, 0.560606)}
					Event={{
						Activated: () => prev(),
					}}
				>
					<imagelabel
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundTransparency={1}
						Image={"rbxassetid://75510749166102"}
						key={"Icon"}
						Position={UDim2.fromScale(0.540541, 0.527027)}
						ScaleType={Enum.ScaleType.Fit}
						Size={UDim2.fromScale(0.594595, 0.662162)}
					/>

					<uiscale key={"UIScale"} />
				</imagebutton>

				<uiaspectratioconstraint key={"UIAspectRatioConstraint"} AspectRatio={4.65152} />
			</frame>
		</AnimatedWindow>
	);
}
