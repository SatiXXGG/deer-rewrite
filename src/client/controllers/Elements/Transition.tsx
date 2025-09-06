import { useMotion } from "@rbxts/pretty-react-hooks";
import React, { useEffect } from "@rbxts/react";

export default function RTransition() {
	const [position, positionMotor] = useMotion(UDim2.fromScale(0, 0));
	useEffect(() => {
		positionMotor.tween(UDim2.fromScale(3, 0), {
			time: 5,
		});

		return () => {
			positionMotor.destroy();
		};
	}, []);
	return <frame Size={UDim2.fromScale(1, 1)} BackgroundColor3={Color3.fromRGB(0, 0, 0)} Position={position}></frame>;
}
