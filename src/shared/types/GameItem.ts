export enum EItemClass {
	bow = "bow",
	wendigo = "wendigo",
	taunt = "tauntVfx",
	deer = "deer",
}

export interface GameItem {
	id: string;
	class: EItemClass;
}
