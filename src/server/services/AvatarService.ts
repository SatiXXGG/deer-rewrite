import { Service, OnStart } from "@flamework/core";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { DataService } from "./DataService";
import { ICharacter } from "shared/components/types/Character";
@Service({})
export class AvatarService implements OnStart {
	private deerSkins = ReplicatedStorage.skins;
	constructor(private DataService: DataService) {}
	onStart() {}
	changeDeer(player: Player) {
		const current = this.DataService.getCurrentDeer(player);
		const playerCharacter = player.Character as ICharacter | undefined;
		const skin = ReplicatedStorage.skins.deer.FindFirstChild(current) as ICharacter | undefined;
		if (skin && playerCharacter) {
			const character = skin.Clone();
			character.Name = player.Name;
			character.HumanoidRootPart.CFrame = playerCharacter.HumanoidRootPart.CFrame;
			character.SetAttribute("isMorph", true);
			player.Character = character;
			character.Parent = Workspace;
			return character;
		}
	}
	changeWendigo(player: Player) {
		const current = this.DataService.getCurrentWendigo(player);
		const playerCharacter = player.Character as ICharacter | undefined;
		const skin = ReplicatedStorage.skins.wendigo.FindFirstChild(current) as ICharacter | undefined;
		if (skin && playerCharacter) {
			const character = skin.Clone();
			character.Name = player.Name;
			character.HumanoidRootPart.CFrame = playerCharacter.HumanoidRootPart.CFrame;
			character.SetAttribute("isMorph", true);
			player.Character = character;
			character.Parent = Workspace;
			return character;
		}
	}
}
