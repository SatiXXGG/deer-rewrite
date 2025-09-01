import { createContext } from "@rbxts/react";
import { EDeerSkins, EWendigoSkins } from "shared/data/Skins";
import { EItemClass } from "shared/types/GameItem";

export type InventoryIds = EWendigoSkins | EDeerSkins;
interface IInventoryContext {
	selected: InventoryIds;
	Class: EItemClass;
	setClass: (Class: EItemClass) => void;
	setSelected: (id: InventoryIds) => void;
}

const RInventoryContext = createContext<IInventoryContext | undefined>(undefined);
export default RInventoryContext;
