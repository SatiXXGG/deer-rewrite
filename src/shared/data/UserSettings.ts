import Object from "@rbxts/object-utils";
import { SoundService, Workspace } from "@rbxts/services";

export enum EUserSetting {
	Shadows = "Shadows",
	Fov = "Fov",
	Music = "Music",
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
	[EUserSetting.Music]: {
		name: "Music",
		description: "Enables music",
		value: true,
		action: (current) => {
			SoundService.GetDescendants().forEach((child) => {
				if (child.IsA("Sound")) {
					child.Volume = current === true ? 0.1 : 0;
				}
			});
		},
	},
	[EUserSetting.Fov]: {
		name: "Fov",
		description: "Changes the camera FOV",
		value: 75,
		min: 75,
		max: 100,
		action: (current) => {
			const cc = Workspace.CurrentCamera;
			cc!.FieldOfView = current as number;
		},
	},
};
