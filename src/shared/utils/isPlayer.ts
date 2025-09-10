import { Players } from "@rbxts/services";
import { ICharacter } from "shared/components/types/Character";
import { Roles } from "shared/types/RoleTags";
import getRole from "./getRole";

/**
 * Util for checking if an instance is a player
 * @param hit
 */
export function isPlayer(hit: Instance, role?: Roles) {
	const model = hit.FindFirstAncestorOfClass("Model");
	if (model && model.FindFirstChildOfClass("Humanoid") && Players.GetPlayerFromCharacter(model) !== undefined) {
		const player = Players.GetPlayerFromCharacter(model)!;
		const currentRole = getRole(player);
		if (role && currentRole !== role) return false;
		return model as ICharacter;
	}
	return false;
}
