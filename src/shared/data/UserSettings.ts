import Object from "@rbxts/object-utils";
import { Workspace } from "@rbxts/services";

export enum EUserSetting {
	Shadows = "Shadows",
}

export interface IUserSettingInfo {
	name: string;
	description: string;
	value: boolean | number;
	min?: number; // for number settings
	max?: number; // for number settings
	action: (value: boolean | number) => void; //runs on client
}

export const TUserSettings: Record<EUserSetting, IUserSettingInfo> = {
	[EUserSetting.Shadows]: {
		name: "Shadows",
		description: "Enables shadows",
		value: true,
		action: (current) => {
			Workspace.GetDescendants().forEach((child) => {
				if (child.IsA("BasePart")) {
					child.CastShadow = current as boolean;
				}
			});
		},
	},
};
