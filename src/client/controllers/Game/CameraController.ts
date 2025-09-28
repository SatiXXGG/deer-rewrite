import { Controller, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { onCharacterAdded } from "client/modding/onCharacterAdded/interface";
import { ICharacter } from "shared/components/types/Character";
import { Roles } from "shared/types/RoleTags";
import getRole from "shared/utils/getRole";

@Controller({})
export class CameraController implements OnStart, onCharacterAdded {
	onStart() {}
	onCharacterAdded(character: ICharacter): void {
		const role = getRole(Players.LocalPlayer);

		if (role === Roles.none) {
			Players.LocalPlayer.CameraMinZoomDistance = 10;
			Players.LocalPlayer.CameraMaxZoomDistance = 30;
			Players.LocalPlayer.CameraMode = Enum.CameraMode.Classic;
		}
	}
}
