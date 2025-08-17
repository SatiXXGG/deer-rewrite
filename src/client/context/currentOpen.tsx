import { createContext } from "@rbxts/react";

type Opened = string | undefined;
interface IOpenedContext {
	opened: Opened;
	setOpened: (opened: Opened) => void;
}

const ROpenedContext = createContext<IOpenedContext | undefined>(undefined);
export default ROpenedContext;
