import { useSpring } from "@rbxts/pretty-react-hooks";
import React, { Suspense, useRef, useState } from "@rbxts/react";
import ObjectViewport from "client/controllers/Elements/ObjectViewport";
import { Functions } from "client/network";
import getClassCf from "client/utils/getClassCf";
import { Containers, EWendigoSkins, IBuyableInfo } from "shared/data/Skins";
import { EItemClass } from "shared/types/GameItem";

interface IProps {
	info: IBuyableInfo;
	bought: boolean;
}

export default function RShopElement(props: IProps) {
	const { info } = props;
	const [mainScale, setMainScale] = useState(1);
	const [isBought, setBought] = useState(props.bought);

	const springScale = useSpring(mainScale);

	const container = Containers[info.class];
	const preview = container.FindFirstChild(info.id)!.Clone() as Model;
	const buttonEvents: React.InstanceEvent<ImageButton> = {
		Activated: () => {
			if (isBought) return;
			const result = Functions.skins.buy.invokeWithTimeout(1, info.class, info.id).expect();
			if (result) {
				setBought(true);
			}
		},
		MouseEnter: () => {
			setMainScale(1.05);
		},
		MouseLeave: () => {
			setMainScale(1);
		},
	};
	assert(preview !== undefined, "Preview is undefined: " + info.display + " " + info.id);
	const cf = preview.GetPivot().mul(getClassCf(info.class));
	//* cframe adjustment

	return (
		<imagelabel
			BackgroundTransparency={1}
			Image={"rbxassetid://127109004354578"}
			key={"Pack1"}
			ScaleType={Enum.ScaleType.Fit}
			Size={UDim2.fromScale(0.487923, 1)}
		>
			<ObjectViewport
				Native={{
					Size: UDim2.fromScale(0.45, 0.9),
					Position: UDim2.fromScale(0, 0.01),
					BackgroundTransparency: 1,
				}}
				Object={preview!}
				cf={cf}
			></ObjectViewport>
			<textlabel
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundTransparency={1}
				FontFace={
					new Font(
						"rbxasset://fonts/families/GothamSSm.json",
						Enum.FontWeight.ExtraBold,
						Enum.FontStyle.Normal,
					)
				}
				key={"Name"}
				Position={UDim2.fromScale(0.686469, 0.148929)}
				Size={UDim2.fromScale(0.495049, 0.40201)}
				Text={props.info.display}
				TextColor3={new Color3(1, 1, 1)}
				TextScaled={true}
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
					key={"Txt"}
					Position={UDim2.fromScale(0.5, 0.466667)}
					Size={UDim2.fromScale(1, 1)}
					Text={props.info.display}
					TextColor3={new Color3(1, 1, 1)}
					TextScaled={true}
				>
					<uistroke key={"UIStroke"} Color={Color3.fromRGB(0, 32, 55)} Thickness={2.5} />
				</textlabel>

				<uistroke key={"UIStroke"} Thickness={3} />

				<uigradient
					key={"UIGradient"}
					Transparency={
						new NumberSequence([new NumberSequenceKeypoint(0, 0.9), new NumberSequenceKeypoint(1, 0.9)])
					}
				/>
			</textlabel>

			<frame
				AnchorPoint={new Vector2(1, 1)}
				BackgroundTransparency={1}
				key={"Buy"}
				Position={UDim2.fromScale(0.933993, 0.899498)}
				Size={UDim2.fromScale(0.49505, 0.276382)}
			>
				<uiscale Scale={springScale}></uiscale>
				<imagebutton
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Image={"rbxassetid://124390301475877"}
					key={"Button"}
					ImageColor3={isBought ? Color3.fromRGB(255, 20, 20) : new Color3(1, 1, 1)}
					Position={UDim2.fromScale(0.5, 0.5)}
					ScaleType={Enum.ScaleType.Fit}
					Size={UDim2.fromScale(1, 1)}
					Event={buttonEvents}
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
						key={"Txt"}
						Position={UDim2.fromScale(0.5, 0.518868)}
						Size={UDim2.fromScale(0.926267, 0.675325)}
						Text={isBought ? "BOUGHT" : "BUY"}
						TextColor3={new Color3(1, 1, 1)}
						TextScaled={true}
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
							key={"Txt"}
							Position={UDim2.fromScale(0.5, 0.458868)}
							Size={UDim2.fromScale(1, 1)}
							Text={isBought ? "BOUGHT" : "BUY"}
							TextColor3={new Color3(1, 1, 1)}
							TextScaled={true}
						>
							<uistroke key={"UIStroke"} Color={Color3.fromRGB(9, 53, 0)} Thickness={2.5} />
						</textlabel>

						<uistroke key={"UIStroke"} Thickness={3} />

						<uigradient
							key={"UIGradient"}
							Transparency={
								new NumberSequence([
									new NumberSequenceKeypoint(0, 0.9),
									new NumberSequenceKeypoint(1, 0.9),
								])
							}
						/>
					</textlabel>
				</imagebutton>
			</frame>
		</imagelabel>
	);
}
