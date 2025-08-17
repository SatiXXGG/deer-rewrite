import { useSpring } from "@rbxts/pretty-react-hooks";
import React, { useContext, useState } from "@rbxts/react";
import ROpenedContext from "client/context/currentOpen";

interface Props {
	Size: UDim2;
	Position: UDim2;
	key: string;
}

export default function RCloseButton(props: Props) {
	const [scale, setScale] = useState(1);
	const spring = useSpring(scale, {
		damping: 0.5,
	});
	const [hover, setHover] = useState(false);
	const context = useContext(ROpenedContext);

	return (
		<frame
			AnchorPoint={new Vector2(1, 0.5)}
			BackgroundTransparency={1}
			key={"Exit"}
			Position={UDim2.fromScale(1, 0.5)}
			Size={UDim2.fromScale(0.0885685, 1)}
		>
			<imagebutton
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Image={"rbxassetid://78261509211756"}
				key={"Button"}
				Position={UDim2.fromScale(0.5, 0.5)}
				ScaleType={Enum.ScaleType.Fit}
				Size={UDim2.fromScale(1, 1)}
				Event={{
					MouseEnter: () => {
						setScale(1.1);
						setHover(true);
					},
					MouseLeave: () => {
						setScale(1);
						setHover(false);
					},
					Activated: () => {
						setScale(1.2);
						context?.setOpened("none");
						task.delay(0.1, () => {
							if (hover) {
								setScale(1);
							} else {
								setScale(1.1);
							}
						});
					},
				}}
			>
				<imagelabel
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Image={"rbxassetid://118315340133234"}
					key={"Icon"}
					Position={UDim2.fromScale(0.5, 0.5)}
					ScaleType={Enum.ScaleType.Fit}
					Size={UDim2.fromScale(0.505882, 0.505882)}
				/>
			</imagebutton>
			<uiscale Scale={spring}></uiscale>
		</frame>
	);
}
