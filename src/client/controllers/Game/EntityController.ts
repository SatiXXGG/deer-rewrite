import { Controller, OnStart } from "@flamework/core";
import Make from "@rbxts/make";
import { CollectionService, Lighting, Players, RunService, Workspace } from "@rbxts/services";
import { ICharacter } from "shared/components/types/Character";
import { Roles } from "shared/types/RoleTags";

@Controller({})
export class EntityController implements OnStart {
	private player = Players.LocalPlayer;

	onStart() {}
	scanMushrooms(time: number, scanLimit: number, maxDistance: number) {
		const character = this.player.Character as ICharacter | undefined;
		if (!character) return;
		const tagged = CollectionService.GetTagged("mushroom") as Model[];
		const highlights: Highlight[] = [];
		const highlights2: Highlight[] = [];

		for (let i = 0; i < scanLimit; i++) {
			const highlight = Make("Highlight", {
				FillColor: Color3.fromRGB(0, 255, 0),
				OutlineColor: Color3.fromRGB(255, 255, 255),
				FillTransparency: 0.5,
				DepthMode: Enum.HighlightDepthMode.AlwaysOnTop,
			});
			highlight.Parent = Lighting;
			highlights.push(highlight);
		}

		RunService.BindToRenderStep("mushroomScan", Enum.RenderPriority.Last.Value, () => {
			const selected: Model[] = [];
			const position = character.HumanoidRootPart.Position;
			tagged.forEach((model) => {
				const pivot = model.GetPivot();
				const distance = pivot.Position.sub(position).Magnitude;
				if (distance < maxDistance && !selected.includes(model) && selected.size() < scanLimit) {
					const size = selected.push(model);
					highlights[size - 1].Parent = model;
				}
			});
		});

		const hunters = CollectionService.GetTagged(Roles.hunter) as Player[];
		hunters.forEach((currentHunter) => {
			if (currentHunter.Character as ICharacter) {
				const h1 = Make("Highlight", {
					Parent: currentHunter.Character!,
				});
				highlights2.push(h1);
			}
		});
		task.delay(time, () => {
			RunService.UnbindFromRenderStep("mushroomScan");
			highlights.forEach((highlight) => {
				highlight.Destroy();
			});

			highlights2.forEach((highlight) => {
				highlight.Destroy();
			});
		});

		const sfx = Make("Sound", {
			SoundId: "rbxassetid://125090389445721",
			Name: "sfx",
			PlayOnRemove: true,
			Parent: this.player,
		});

		sfx.Destroy();
	}
}
