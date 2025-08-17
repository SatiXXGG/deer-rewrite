import { useSpring } from "@rbxts/pretty-react-hooks";
import React, { useContext, useState } from "@rbxts/react";
import ROpenedContext from "client/context/currentOpen";

interface Props {
	imageId: string;
	id: string;
	order: number;
}

export function RSectionButton(props: Props) {
	const [scale, setScale] = useState(1);
	const [hovering, setHovering] = useState(false);

	const scaleSpring = useSpring(scale, {
		damping: 0.5,
	});

	const context = useContext(ROpenedContext);
	return (
		<imagebutton
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
			Image="rbxassetid://81335440706130"
			LayoutOrder={props.order}
			key={props.id}
			Position={UDim2.fromScale(0.5, 0.5)}
			ScaleType={Enum.ScaleType.Fit}
			Size={UDim2.fromScale(0.119417, 1)}
			Event={{
				Activated: () => {
					setScale(1.15);
					task.delay(0.1, () => {
						if (!hovering) {
							setScale(1);
							return;
						}

						setScale(1.1);
					});

					if (context) {
						context.setOpened(props.id);
					}
				},
				MouseEnter: () => {
					setScale(1.1);
					setHovering(true);
				},
				MouseLeave: () => {
					setScale(1);
					setHovering(false);
				},
			}}
		>
			<imagelabel
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Image={props.imageId}
				key={"Icon"}
				Position={UDim2.fromScale(0.5, 0.5)}
				ScaleType={Enum.ScaleType.Fit}
				Size={UDim2.fromScale(0.604183, 0.604183)}
			/>

			<uiscale key={"UIScale"} Scale={scaleSpring} />
		</imagebutton>
	);
}
