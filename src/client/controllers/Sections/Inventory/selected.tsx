import { useMotion, useSpring } from "@rbxts/pretty-react-hooks";
import React, { useContext, useEffect, useState } from "@rbxts/react";
import RInventoryContext from "client/context/inventorySelected";
import ObjectViewport from "client/controllers/Elements/ObjectViewport";
import { Functions } from "client/network";
import getClassCf from "client/utils/getClassCf";
import { Containers, GetInfoByClass } from "shared/data/Skins";
import { EItemClass } from "shared/types/GameItem";

export default function RInventorySelected() {
	const [item, setItem] = useState<Model | undefined>(undefined);
	const [equipped, setEquipped] = useState(false);

	const [name, setName] = useState("None");
	const [scale, setScale] = useState(1);
	const [buttonColor, colorMotor] = useMotion(new Color3(1, 1, 1));
	const springScale = useSpring(scale);

	const context = useContext(RInventoryContext);

	useEffect(() => {
		if (context) {
			const { selected, Class } = context;
			const container = Containers[Class];
			const model = container.FindFirstChild(selected) as Model | undefined;

			if (model) {
				setItem(() => {
					return model;
				});
			} else {
				setItem(() => {
					return undefined;
				});
			}

			const info = GetInfoByClass(Class, selected);
			setName(info.display);

			//* Equip handling

			Functions.skins.isEquipped.invoke(Class, selected).then((equipped) => {
				setEquipped(equipped);
			});

			if (equipped) {
				colorMotor.tween(Color3.fromRGB(255, 28, 0));
			} else {
				colorMotor.tween(Color3.fromRGB(255, 255, 255));
			}
		}
	}, [context?.selected, context?.Class, equipped]);
	return (
		<imagelabel
			BackgroundTransparency={1}
			Image={"rbxassetid://94206949712787"}
			LayoutOrder={2}
			key={"Tab"}
			ScaleType={Enum.ScaleType.Fit}
			Size={UDim2.fromScale(0.307933, 1)}
		>
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
				LayoutOrder={1}
				key={"Name"}
				Position={UDim2.fromScale(0.5, 0.0207469)}
				Size={UDim2.fromScale(1, 0.103734)}
				Text={name}
				TextColor3={new Color3(1, 1, 1)}
				TextScaled={true}
			>
				<uigradient
					key={"UIGradient"}
					Color={
						new ColorSequence([
							new ColorSequenceKeypoint(0, new Color3(1, 1, 1)),
							new ColorSequenceKeypoint(0.3, new Color3(1, 1, 1)),
							new ColorSequenceKeypoint(0.7, Color3.fromRGB(169, 169, 169)),
							new ColorSequenceKeypoint(1, Color3.fromRGB(169, 169, 169)),
						])
					}
					Rotation={90}
				/>
			</textlabel>

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
				LayoutOrder={1}
				key={"Rarity"}
				Position={UDim2.fromScale(0.5, 0.124481)}
				Size={UDim2.fromScale(1, 0.0829876)}
				Text={"EPIC"}
				TextColor3={new Color3(1, 1, 1)}
				TextScaled={true}
			>
				<uigradient
					key={"UIGradient"}
					Color={
						new ColorSequence([
							new ColorSequenceKeypoint(0, Color3.fromRGB(255, 0, 229)),
							new ColorSequenceKeypoint(0.3, Color3.fromRGB(255, 0, 229)),
							new ColorSequenceKeypoint(0.7, Color3.fromRGB(183, 0, 255)),
							new ColorSequenceKeypoint(1, Color3.fromRGB(183, 0, 255)),
						])
					}
					Rotation={90}
				/>
			</textlabel>

			<frame
				AnchorPoint={new Vector2(0.5, 1)}
				BackgroundTransparency={1}
				key={"Equip"}
				Position={UDim2.fromScale(0.5, 0.950207)}
				Size={UDim2.fromScale(0.779661, 0.172199)}
				Event={{ MouseEnter: () => setScale(1.1), MouseLeave: () => setScale(1) }}
			>
				<imagebutton
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Image={"rbxassetid://130232592535383"}
					key={"Button"}
					Position={UDim2.fromScale(0.5, 0.5)}
					ScaleType={Enum.ScaleType.Fit}
					Size={UDim2.fromScale(1, 1)}
					ImageColor3={buttonColor}
					Event={{
						Activated: () => {
							if (context) {
								Functions.inventory.equip.invoke(context.Class, context.selected).then((res) => {
									setEquipped(res);
								});
							}
						},
					}}
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
						LayoutOrder={1}
						key={"Txt"}
						Position={UDim2.fromScale(0.5, 0.524096)}
						Size={UDim2.fromScale(1, 0.564915)}
						Text={equipped ? "UNEQUIP" : "EQUIP"}
						TextColor3={new Color3()}
						TextScaled={true}
					>
						<uistroke key={"UIStroke"} Thickness={3} />

						<uigradient
							key={"UIGradient"}
							Transparency={
								new NumberSequence([
									new NumberSequenceKeypoint(0, 0.8),
									new NumberSequenceKeypoint(1, 0.8),
								])
							}
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
							LayoutOrder={1}
							key={"Txt"}
							Position={UDim2.fromScale(0.5, 0.436018)}
							Size={UDim2.fromScale(1, 1)}
							Text={equipped ? "UNEQUIP" : "EQUIP"}
							TextColor3={new Color3(1, 1, 1)}
							TextScaled={true}
						>
							<uistroke key={"UIStroke"} Color={Color3.fromRGB(6, 55, 1)} Thickness={3} />

							<uigradient key={"UIGradient"} />
						</textlabel>
					</textlabel>
				</imagebutton>
				<uiscale Scale={springScale}></uiscale>
			</frame>

			{item !== undefined && (
				<ObjectViewport
					key={item.GetFullName()}
					Native={{
						AnchorPoint: new Vector2(0.5, 0.5),
						BackgroundTransparency: 1,
						key: "preview",
						Position: UDim2.fromScale(0.499926, 0.496482),
						Size: UDim2.fromScale(0.792336, 0.508028),
					}}
					Object={item.Clone()}
					cf={item.GetPivot().mul(getClassCf(context?.Class || EItemClass.wendigo))}
				>
					<uiscale Scale={springScale}></uiscale>
				</ObjectViewport>
			)}

			<imagelabel
				BackgroundTransparency={1}
				key={"image"}
				Position={UDim2.fromScale(0.179219, 0.26556)}
				Size={UDim2.fromScale(0.641415, 0.392567)}
			/>
		</imagelabel>
	);
}
