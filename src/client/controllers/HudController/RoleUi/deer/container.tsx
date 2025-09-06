import { useMotion, useSpring } from "@rbxts/pretty-react-hooks";
import React, { useEffect } from "@rbxts/react";

interface Props {
	icon: `rbxassetid://${number}`;
	text: string;
	action?: () => void;
	active: boolean;
}

export default function RDeerContainer({ icon, text, action, active }: Props) {
	const scaleSpring = useSpring(active ? 0.8 : 1);
	const [color, colorMotor] = useMotion(new Color3(1, 1, 1));

	useEffect(() => {
		if (active) {
			colorMotor.tween(new Color3(0, 0, 0));
		} else {
			colorMotor.tween(new Color3(1, 1, 1));
		}
	}, [active]);

	return (
		<textbutton
			BackgroundColor3={new Color3()}
			BackgroundTransparency={0.55}
			FontFace={new Font("rbxasset://fonts/families/SourceSansPro.json")}
			key={"boost"}
			Event={{
				Activated: action,
			}}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Position={UDim2.fromScale(1.10964, 0.312416)}
			Size={UDim2.fromScale(0.163912, 0.574718)}
			Text={""}
			TextColor3={new Color3()}
			TextSize={14}
		>
			<uiscale key={"UIScale"} Scale={scaleSpring}></uiscale>
			<uicorner key={"UICorner"} CornerRadius={new UDim(0, 20)} />

			<uistroke
				key={"UIStroke"}
				ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
				Color={new Color3(1, 1, 1)}
				Thickness={6.7}
				Transparency={0.59}
			/>

			<imagelabel
				BackgroundTransparency={1}
				Image={icon}
				key={"icon"}
				ImageColor3={color}
				Position={UDim2.fromScale(0.109375, 0.109375)}
				Size={UDim2.fromScale(0.78125, 0.78125)}
			/>

			<textlabel
				BackgroundTransparency={1}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				key={"keycode"}
				Position={UDim2.fromScale(0, 0.90625)}
				Size={UDim2.fromScale(1, 0.242188)}
				Text={active ? "" : text}
				TextColor3={Color3.fromRGB(255, 83, 26)}
				TextScaled={true}
			>
				<uistroke key={"UIStroke"} Thickness={5.5} />
			</textlabel>

			<textlabel
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				key={"loading"}
				Position={UDim2.fromScale(0.5, 0.5)}
				Size={UDim2.fromScale(0.812785, 0.276589)}
				Text={""}
				TextColor3={new Color3(1, 1, 1)}
				TextScaled={true}
			/>
		</textbutton>
	);
}
