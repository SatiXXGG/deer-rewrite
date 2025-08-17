import React from "@rbxts/react";

export default function RDayReward() {
	return (
		<imagelabel
			BackgroundTransparency={1}
			Image={"rbxassetid://114348435075941"}
			key={"Day1"}
			ScaleType={Enum.ScaleType.Fit}
			Size={UDim2.fromScale(0.321928, 1)}
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
				key={"Txt"}
				Position={UDim2.fromScale(0.511628, 0.0698517)}
				Size={UDim2.fromScale(0.854651, 0.189055)}
				Text={"DAY 1"}
				TextColor3={new Color3(1, 1, 1)}
				TextScaled={true}
			>
				<uistroke key={"UIStroke"} Thickness={2.5} />

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
					Position={UDim2.fromScale(0.5, 0.446839)}
					Size={UDim2.fromScale(1, 1)}
					Text={"DAY 1"}
					TextColor3={new Color3(1, 1, 1)}
					TextScaled={true}
				>
					<uistroke key={"UIStroke"} Color={Color3.fromRGB(1, 34, 73)} Thickness={2.5} />
				</textlabel>

				<uigradient
					key={"UIGradient"}
					Color={
						new ColorSequence([
							new ColorSequenceKeypoint(0, new Color3()),
							new ColorSequenceKeypoint(1, new Color3()),
						])
					}
					Transparency={
						new NumberSequence([new NumberSequenceKeypoint(0, 0.9), new NumberSequenceKeypoint(1, 0.9)])
					}
				/>
			</textlabel>

			<imagelabel
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Image={"rbxasset://textures/ui/GuiImagePlaceholder.png"}
				key={"PlaceHolder"}
				Position={UDim2.fromScale(0.5, 0.469849)}
				ScaleType={Enum.ScaleType.Fit}
				Size={UDim2.fromScale(0.546448, 0.483092)}
				ZIndex={0}
			/>

			<frame
				AnchorPoint={new Vector2(0.5, 1)}
				BackgroundTransparency={1}
				key={"Claim"}
				Position={UDim2.fromScale(0.5, 0.912293)}
				Size={UDim2.fromScale(0.816425, 0.311558)}
			>
				<imagebutton
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Image={"rbxassetid://107155245665730"}
					key={"Button"}
					Position={UDim2.fromScale(0.5, 0.5)}
					ScaleType={Enum.ScaleType.Fit}
					Size={UDim2.fromScale(1, 1)}
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
						Position={UDim2.fromScale(0.5, 0.513889)}
						Size={UDim2.fromScale(0.926267, 0.675325)}
						Text={"CLAIM"}
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
							Text={"CLAIM"}
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

			<frame
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={new Color3()}
				BackgroundTransparency={0.8}
				key={"LockLayer"}
				Position={UDim2.fromScale(0.5, 0.5)}
				Size={UDim2.fromScale(1, 1)}
				Visible={false}
				ZIndex={3}
			>
				<imagelabel
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Image={"rbxassetid://116996173361417"}
					key={"Lock"}
					Position={UDim2.fromScale(0.5, 0.5)}
					ScaleType={Enum.ScaleType.Fit}
					Size={UDim2.fromScale(0.825581, 0.706468)}
				/>

				<uicorner key={"UICorner"} CornerRadius={new UDim(0.0603015, 0)} />
			</frame>

			<textlabel
				AnchorPoint={new Vector2(0.5, 1)}
				BackgroundTransparency={1}
				FontFace={
					new Font(
						"rbxasset://fonts/families/GothamSSm.json",
						Enum.FontWeight.ExtraBold,
						Enum.FontStyle.Normal,
					)
				}
				LayoutOrder={1}
				key={"Counter"}
				Position={UDim2.fromScale(0.511628, 0.899498)}
				Size={UDim2.fromScale(0.854651, 0.189055)}
				Text={"+50"}
				TextColor3={new Color3(1, 1, 1)}
				TextScaled={true}
				Visible={false}
			>
				<uistroke key={"UIStroke"} Thickness={2.5} />

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
					Position={UDim2.fromScale(0.5, 0.446839)}
					Size={UDim2.fromScale(1, 1)}
					Text={"+50"}
					TextColor3={new Color3(1, 1, 1)}
					TextScaled={true}
				>
					<uistroke key={"UIStroke"} Color={Color3.fromRGB(1, 34, 73)} Thickness={2.5} />
				</textlabel>

				<uigradient
					key={"UIGradient"}
					Color={
						new ColorSequence([
							new ColorSequenceKeypoint(0, new Color3()),
							new ColorSequenceKeypoint(1, new Color3()),
						])
					}
					Transparency={
						new NumberSequence([new NumberSequenceKeypoint(0, 0.9), new NumberSequenceKeypoint(1, 0.9)])
					}
				/>
			</textlabel>
		</imagelabel>
	);
}
