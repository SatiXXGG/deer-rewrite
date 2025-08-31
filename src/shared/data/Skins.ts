import { ReplicatedStorage } from "@rbxts/services";
import { EItemClass, GameItem } from "shared/types/GameItem";

export enum EDeerSkins {
	default = "default",
}

export enum EWendigoSkins {
	default = "default",
	bigFoot = "BigFoot",
	blueGradient = "Blue",
	blueFire = "BlueFire",
	hat = "Hat",
	WhiteScary = "WhiteScary",
	blue = "blue",
	green = "green",
	red = "red",
}

export interface IBuyableInfo extends GameItem {
	price: number;
	display: string;
	startWith?: boolean;
}

export const DeerSkinsInfo: Record<EDeerSkins, IBuyableInfo> = {
	[EDeerSkins.default]: {
		id: EDeerSkins.default,
		class: EItemClass.deer,
		startWith: false,
		price: 0,
		display: "Default",
	},
};
export const WendigoSkinsInfo: Record<EWendigoSkins, IBuyableInfo> = {
	[EWendigoSkins.default]: {
		id: EWendigoSkins.default,
		class: EItemClass.wendigo,
		startWith: true,
		price: 0,
		display: "Default",
	},
	[EWendigoSkins.WhiteScary]: {
		id: EWendigoSkins.WhiteScary,
		class: EItemClass.wendigo,
		startWith: false,
		price: 0,
		display: "White Scary",
	},
	[EWendigoSkins.blueFire]: {
		id: EWendigoSkins.blueFire,
		class: EItemClass.wendigo,
		startWith: false,
		price: 0,
		display: "Blue Fire",
	},
	[EWendigoSkins.blueGradient]: {
		id: EWendigoSkins.blueGradient,
		class: EItemClass.wendigo,
		startWith: false,
		price: 0,
		display: "Blue Gradient",
	},
	[EWendigoSkins.bigFoot]: {
		id: EWendigoSkins.bigFoot,
		class: EItemClass.wendigo,
		startWith: false,
		price: 0,
		display: "Big Foot",
	},
	[EWendigoSkins.hat]: {
		id: EWendigoSkins.hat,
		class: EItemClass.wendigo,
		startWith: false,
		price: 0,
		display: "Hat",
	},
	[EWendigoSkins.green]: {
		id: EWendigoSkins.green,
		class: EItemClass.wendigo,
		startWith: false,
		price: 0,
		display: "Green",
	},
	[EWendigoSkins.red]: {
		id: EWendigoSkins.red,
		class: EItemClass.wendigo,
		startWith: false,
		price: 0,
		display: "Red",
	},
	[EWendigoSkins.blue]: {
		id: EWendigoSkins.blue,
		class: EItemClass.wendigo,
		startWith: false,
		price: 0,
		display: "Blue",
	},
};

export const Containers: Record<EItemClass, Folder> = {
	[EItemClass.deer]: ReplicatedStorage.skins.deer,
	[EItemClass.wendigo]: ReplicatedStorage.skins.wendigo,
	[EItemClass.bow]: ReplicatedStorage.skins.bow,
	[EItemClass.taunt]: ReplicatedStorage.skins.taunt,
};

export const ClassInfo: Record<EItemClass, { [id: string]: IBuyableInfo }> = {
	[EItemClass.deer]: DeerSkinsInfo,
	[EItemClass.wendigo]: WendigoSkinsInfo,
	[EItemClass.bow]: {},
	[EItemClass.taunt]: {},
};

export function GetInfoByClass(Class: EItemClass, id: string) {
	return ClassInfo[Class][id];
}
