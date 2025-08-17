import { useSpring } from "@rbxts/pretty-react-hooks";
import React from "@rbxts/react";

interface Props {
	children?: React.Element | React.Element[];
	size: UDim2;
	position: UDim2;
	anchorPoint: Vector2;
	isOpen: boolean;
}
export default function AnimatedWindow(props: Props) {
	const spring = useSpring(props.isOpen ? 1 : 0, {
		damping: 0.5,
	});

	const position = useSpring(props.isOpen ? props.position : props.position.sub(UDim2.fromScale(0, 0.5)), {
		damping: 0.6,
	});

	return (
		<frame Transparency={1} Size={props.size} Position={position} AnchorPoint={props.anchorPoint}>
			{props.children}
			<uiscale Scale={spring}></uiscale>
		</frame>
	);
}
