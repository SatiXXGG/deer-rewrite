import { Signal } from "@rbxts/beacon";
import { Events } from "client/network";
import { Roles } from "shared/types/RoleTags";

interface IHunterInfo {
	id: number;
	dead: boolean;
}

export const WinnerState = {
	role: Roles.none as Roles,
	hunters: undefined as [IHunterInfo, IHunterInfo] | undefined,
	onChange: new Signal(),

	set(role: Roles, hunters: [IHunterInfo, IHunterInfo]) {
		this.role = role;
		this.hunters = hunters;
		this.onChange.Fire(undefined);
	},

	get() {
		return {
			role: this.role,
			hunters: this.hunters,
		};
	},
	reset() {
		this.role = Roles.none;
		this.hunters = undefined;
	},
};
