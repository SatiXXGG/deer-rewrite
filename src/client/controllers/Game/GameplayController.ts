import { Controller, OnStart } from "@flamework/core";
import { ActionsController, InputActionsInitializationHelper, InputContext } from "@rbxts/input-actions";
import Make from "@rbxts/make";
import { CollectionService, Lighting, Players } from "@rbxts/services";
import { Trove } from "@rbxts/trove";
import { onCharacterAdded } from "client/modding/onCharacterAdded/interface";
import { Events } from "client/network";
import { ICharacter } from "shared/components/types/Character";
import { Roles } from "shared/types/RoleTags";
import { EntityController } from "./EntityController";

@Controller({})
export class GameplayController implements OnStart, onCharacterAdded {
	private trove = new Trove();
	private player = Players.LocalPlayer;
	private GameplayContext = new InputContext("Gameplay");
	constructor(private EntityController: EntityController) {}
	onStart() {
		this.GameplayContext.Add("eat", {
			KeyboardAndMouse: Enum.KeyCode.E,
			Gamepad: Enum.KeyCode.ButtonX,
		});

		this.GameplayContext.Add("scan", {
			KeyboardAndMouse: Enum.KeyCode.Q,
			Gamepad: Enum.KeyCode.ButtonY,
		});

		this.GameplayContext.Assign();
		InputActionsInitializationHelper.InitAll();
	}
	onCharacterAdded(character: ICharacter): void {
		print("cleanup");
		this.trove.clean();
		const tags = this.player.GetTags();
		if (tags.includes(Roles.deer)) {
			this.deer(character);
		}
	}

	deer(character: ICharacter) {
		const mushrooms = CollectionService.GetTagged("mushroom") as Model[];
		let lastDistance = 0;
		let currentMushroom: Model | undefined = undefined;
		const root = character.HumanoidRootPart;

		const mushroomHighlight = Make("Highlight", {
			FillColor: Color3.fromRGB(0, 255, 0),
			OutlineColor: Color3.fromRGB(255, 255, 255),
			FillTransparency: 0.5,
			DepthMode: Enum.HighlightDepthMode.AlwaysOnTop,
		});

		this.trove.bindToRenderStep("mushroomDetection", Enum.RenderPriority.Last.Value, (dt: number) => {
			lastDistance = math.huge;
			currentMushroom = undefined;

			mushrooms.forEach((model) => {
				const distance = root.Position.sub(model.GetPivot().Position).Magnitude;
				if (distance < lastDistance && distance < 17) {
					lastDistance = distance;
					currentMushroom = model;
					mushroomHighlight.Parent = currentMushroom;
				}
			});

			if (!currentMushroom) {
				mushroomHighlight.Parent = Lighting;
			} else {
				if (ActionsController.IsJustPressed("eat")) {
					/** handling eat */
					Events.gameplay.eat.fire(currentMushroom);
				}
			}
		});

		this.trove.bindToRenderStep("controls", Enum.RenderPriority.Input.Value, () => {
			if (ActionsController.IsJustPressed("scan")) {
				/** scan handling */
				this.EntityController.scanMushrooms(10, 20, 150);
			}
		});
	}
}
