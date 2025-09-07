import { Controller, OnStart } from "@flamework/core";
import { ActionsController, InputActionsInitializationHelper, InputContext } from "@rbxts/input-actions";
import Make from "@rbxts/make";
import { CollectionService, Lighting, Players, TweenService, Workspace } from "@rbxts/services";
import { Trove } from "@rbxts/trove";
import { onCharacterAdded } from "client/modding/onCharacterAdded/interface";
import { Events } from "client/network";
import { ICharacter } from "shared/components/types/Character";
import { Roles } from "shared/types/RoleTags";
import { EntityController } from "./EntityController";
import { EPlayerState, PlayerState } from "../data/State";
import { AnimationController } from "./AnimationController";
import { DeerAnimations, WendigoAnimations } from "shared/data/Animations";
import getRole from "shared/utils/getRole";

@Controller({ loadOrder: 2 })
export class GameplayController implements OnStart, onCharacterAdded {
	private trove = new Trove();
	private player = Players.LocalPlayer;
	private GameplayContext = new InputContext("Gameplay");
	constructor(private EntityController: EntityController, private AnimationController: AnimationController) {}
	onStart() {
		this.GameplayContext.Add("eat", {
			KeyboardAndMouse: Enum.KeyCode.E,
			Gamepad: Enum.KeyCode.ButtonX,
		});

		this.GameplayContext.Add("scan", {
			KeyboardAndMouse: Enum.KeyCode.Q,
			Gamepad: Enum.KeyCode.ButtonB,
		});

		this.GameplayContext.Add("taunt", {
			KeyboardAndMouse: Enum.KeyCode.T,
			Gamepad: Enum.KeyCode.ButtonY,
		});

		this.GameplayContext.Add("run", {
			KeyboardAndMouse: Enum.KeyCode.LeftShift,
			Gamepad: Enum.KeyCode.ButtonL2,
		});

		this.GameplayContext.Add("attack", {
			KeyboardAndMouse: Enum.UserInputType.MouseButton1,
			Gamepad: Enum.KeyCode.ButtonR2,
		});

		this.GameplayContext.Assign();
		InputActionsInitializationHelper.InitAll();

		/** Animations deer */
		this.AnimationController.create(DeerAnimations.eating, "eatDeer");
		this.AnimationController.create(DeerAnimations.taunt, "tauntDeer");
		this.AnimationController.create(DeerAnimations.run, "runDeer");
		this.AnimationController.create(DeerAnimations.idle, "idleDeer");
		this.AnimationController.create(DeerAnimations.walk, "walkDeer");
		/** Animations wendigo */
		this.AnimationController.create(WendigoAnimations.run, "runWendigo");
		this.AnimationController.create(WendigoAnimations.idle, "idleWendigo");
		this.AnimationController.create(WendigoAnimations.walk, "walkWendigo");
		this.AnimationController.create(WendigoAnimations.transformation, "transformation");
		this.AnimationController.create(WendigoAnimations.scream, "scream");
		this.AnimationController.create(WendigoAnimations.attackL, "attackL");
		this.AnimationController.create(WendigoAnimations.attackR, "attackR");

		/** States */

		PlayerState.onAdd((state) => {
			if (state === EPlayerState.hungry || state === EPlayerState.stunned) {
				ActionsController.Release("run");
			}
		});
	}

	onCharacterAdded(character: ICharacter): void {
		print("cleanup");
		this.trove.clean();
		const tags = this.player.GetTags();
		if (getRole(this.player) === Roles.deer) {
			this.deer(character);
		} else if (getRole(this.player) === Roles.wendigo) {
			this.wendigo(character);
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
				if (ActionsController.IsJustPressed("eat") && !PlayerState.listHasState(EPlayerState.eating)) {
					/** handling eat */
					Events.gameplay.eat.fire(currentMushroom);
					PlayerState.add(EPlayerState.eating, math.huge);
					this.AnimationController.play("eatDeer");
					task.delay(3, () => {
						PlayerState.remove(EPlayerState.eating);
					});
				}
			}
		});

		this.trove.bindToRenderStep("controls", Enum.RenderPriority.Input.Value, () => {
			if (ActionsController.IsJustPressed("scan") && !PlayerState.listHasState(EPlayerState.scanning)) {
				/** scan handling */
				this.EntityController.scanMushrooms(10, 20, 150);
				/** Vfx */
				const partVfx = Make("Part", {
					Shape: Enum.PartType.Cylinder,
					CFrame: root.CFrame.mul(CFrame.Angles(0, 0, math.rad(90))).mul(new CFrame(0, -2, 0)),
					Anchored: true,
					Size: new Vector3(0, 0, 0),
					CanCollide: false,
					CanQuery: false,
					Transparency: 0,
					Parent: Workspace,
					Material: Enum.Material.Neon,
				});

				const tweenTime = 0.3;
				const partTween = TweenService.Create(partVfx, new TweenInfo(tweenTime), {
					Size: new Vector3(0.1, 150, 150),
					Transparency: 1,
				});

				partTween.Play();

				task.delay(tweenTime, () => {
					partVfx.Destroy();
					partTween.Destroy();
				});

				PlayerState.add(EPlayerState.scanning, math.huge);
				task.delay(20, () => {
					PlayerState.remove(EPlayerState.scanning);
				});
			} else if (ActionsController.IsJustPressed("taunt") && !PlayerState.listHasState(EPlayerState.taunt)) {
				Events.gameplay.taunt.fire();
				PlayerState.add(EPlayerState.taunt, math.huge);
				this.AnimationController.play("tauntDeer");
				task.delay(3, () => {
					PlayerState.remove(EPlayerState.taunt);
				});
			} else if (
				ActionsController.IsJustPressed("run") &&
				!PlayerState.listHasState(EPlayerState.stunned) &&
				!PlayerState.listHasState(EPlayerState.hungry)
			) {
				this.AnimationController.play("runDeer");
				character.Humanoid.WalkSpeed = 25;
			} else if (ActionsController.IsJustReleased("run") && !PlayerState.listHasState(EPlayerState.hungry)) {
				this.AnimationController.stop("runDeer");
				character.Humanoid.WalkSpeed = 8;
				if (character.Humanoid.MoveDirection.Magnitude >= 1) {
					this.AnimationController.play("walkDeer");
				} else {
					this.AnimationController.play("idleDeer");
				}
			}
		});

		this.trove.connect(this.player.GetAttributeChangedSignal("Hunger"), () => {
			const current = this.player.GetAttribute("Hunger") as number | undefined;
			if (current !== undefined) {
				if (current <= 0) {
					PlayerState.add(EPlayerState.hungry, math.huge);
					character.Humanoid.WalkSpeed = 8;
				} else {
					PlayerState.remove(EPlayerState.hungry);
				}
			}
		});
	}

	wendigo(character: ICharacter) {
		let left = false;
		this.trove.bindToRenderStep("controls", Enum.RenderPriority.Input.Value, () => {
			if (ActionsController.IsJustPressed("attack") && !PlayerState.listHasState(EPlayerState.attacking)) {
				this.attack();
				if (left) {
					left = false;
					this.AnimationController.play("attackL");
				} else {
					left = true;
					this.AnimationController.play("attackR");
				}
			} else if (ActionsController.IsJustPressed("taunt") && !PlayerState.listHasState(EPlayerState.screaming)) {
				Events.gameplay.taunt.fire();
				PlayerState.add(EPlayerState.screaming, math.huge);
				this.AnimationController.play("scream");
				task.delay(5, () => {
					PlayerState.remove(EPlayerState.screaming);
				});
			}
		});
	}
	attack() {
		PlayerState.add(EPlayerState.attacking, math.huge);
		Events.gameplay.attack.fire();
		task.delay(0.18, () => {
			PlayerState.remove(EPlayerState.attacking);
		});
	}
}
