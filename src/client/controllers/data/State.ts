import { Statefy } from "@rbxts/statefy";

export enum EPlayerState {
	scanning = "scanning",
	eating = "eating",
	taunt = "taunt",
	none = "none",
	hungry = "hungry",
	stunned = "stunned",
}
export const PlayerState = new Statefy<EPlayerState>(EPlayerState.none);
PlayerState.override = false;
PlayerState.listStateRewrite = false;
