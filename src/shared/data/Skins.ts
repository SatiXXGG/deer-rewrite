import { EItemClass, GameItem } from "shared/types/GameItem";

export enum EDeerSkins {
	default = "default",
}

interface IDeerSkinInfo extends GameItem {
	price: number;
	display: string;
	startWith?: boolean;
}

export const DeerSkinsInfo: Record<EDeerSkins, IDeerSkinInfo> = {
	[EDeerSkins.default]: {
		id: EDeerSkins.default,
		class: EItemClass.deer,
		startWith: true,
		price: 0,
		display: "Default",
	},
};
