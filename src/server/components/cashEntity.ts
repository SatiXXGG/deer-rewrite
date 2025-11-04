import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { Players } from "@rbxts/services";
import { DataService } from "server/services/DataService";
import Make from "@rbxts/make";

interface Attributes {}

@Component({
	tag: "cashEntity",
})
export class CashEntity extends BaseComponent<Attributes, BasePart> implements OnStart {
	constructor(private DataManager: DataService) {
		super();
	}
	onStart() {
		const sound = Make("Sound", {
			SoundId: "rbxassetid://14621507602",
			Name: "sfx",
			Parent: this.instance,
			PlayOnRemove: true,
			Looped: false,
			Volume: 0.5,
		});
		const conn = this.instance.Touched.Connect((hit) => {
			const model = hit.FindFirstAncestorWhichIsA("Model");
			if (model) {
				const humanoid = model.FindFirstChildWhichIsA("Humanoid");
				const player = Players.GetPlayerFromCharacter(model);

				if (humanoid && player) {
					this.instance.Destroy();
					//* gives cash to player
					this.DataManager.addCash(player, 100);
					sound.Destroy();
				}
			}
		});

		this.instance.Destroying.Connect(() => {
			conn.Disconnect();
			super.destroy();
		});
	}
}
