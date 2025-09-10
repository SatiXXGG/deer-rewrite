import React from "@rbxts/react";
import RSettingsHeader from "./header";
import RToggleSetting from "./toggle";
import Object from "@rbxts/object-utils";
import { EUserSetting, IUserSettingInfo, TUserSettings } from "shared/data/UserSettings";
import RSliderSetting from "./slider";

export default function RSettingsUi() {
	return (
		<imagelabel
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
			Image={"rbxassetid://83771430816038"}
			key={"Settings"}
			Position={UDim2.fromScale(0.5, 0.5)}
			ScaleType={Enum.ScaleType.Fit}
			Size={UDim2.fromScale(1, 1)}
		>
			<RSettingsHeader></RSettingsHeader>
			<frame
				AnchorPoint={new Vector2(0.5, 1)}
				BackgroundTransparency={1}
				ClipsDescendants={true}
				key={"Holder"}
				Position={UDim2.fromScale(0.5, 0.985037)}
				Size={UDim2.fromScale(0.938716, 0.793017)}
			>
				<scrollingframe
					AnchorPoint={new Vector2(0.5, 0)}
					AutomaticCanvasSize={Enum.AutomaticSize.Y}
					BackgroundTransparency={1}
					BottomImage={"rbxassetid://93079608146987"}
					CanvasSize={new UDim2()}
					ClipsDescendants={false}
					MidImage={"rbxassetid://103921755022681"}
					key={"Scroller"}
					Position={UDim2.fromScale(0.5, 0)}
					ScrollBarImageTransparency={1}
					ScrollBarThickness={0}
					ScrollingDirection={Enum.ScrollingDirection.Y}
					Size={UDim2.fromScale(1, 0.937107)}
					TopImage={"rbxassetid://132456408835496"}
				>
					<uilistlayout
						key={"UIListLayout"}
						HorizontalAlignment={Enum.HorizontalAlignment.Center}
						Padding={new UDim(0.0167785, 0)}
						SortOrder={Enum.SortOrder.LayoutOrder}
					/>
					<>
						{Object.entries(TUserSettings).map(([key, value]) => {
							const setting = key as EUserSetting;
							const info = value as IUserSettingInfo;
							const tOf = typeOf(info.value);
							if (tOf === "boolean") {
								return (
									<RToggleSetting
										title={info.name}
										desc={info.description}
										setting={setting}
									></RToggleSetting>
								);
							} else if (tOf === "number") {
								return (
									<RSliderSetting
										setting={setting}
										title={info.name}
										desc={info.description}
									></RSliderSetting>
								);
							}
						})}
					</>
				</scrollingframe>
			</frame>

			<uiaspectratioconstraint key={"UIAspectRatioConstraint"} AspectRatio={0.902743} />
		</imagelabel>
	);
}
