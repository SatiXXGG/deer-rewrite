import { Service, OnStart } from "@flamework/core";
import { VotingInstance, VotingService } from "./VotingService";
import { Rounds, RoundService } from "./RoundService";
import { MapService } from "./MapService";
import { SpawnService } from "./SpawnService";
import { CollectionService, Players } from "@rbxts/services";
import { Settings } from "shared/data/GameSettings";
import { Roles } from "shared/types/RoleTags";

@Service({})
export class GameController implements OnStart {
	private votingInstance: VotingInstance | undefined;
	private lastRound = Rounds.Survive;
	constructor(
		private VotingService: VotingService,
		private RoundService: RoundService,
		private MapService: MapService,
		private SpawnService: SpawnService,
	) {}

	onStart() {
		this.RoundService.onChange((current) => {
			if (current === this.lastRound) {
				return;
			}
			this.lastRound = current;
			if (current === Rounds.Voting) {
				this.votingInstance = this.VotingService.startVoting();
			} else if (current === Rounds.Loading && this.votingInstance) {
				const result = this.votingInstance.finish();
				print("🏆 Map Winner: " + result.name);
				this.MapService.loadMap(result.name);
				//* mushroom spawn
				print("🍄 Mushroom Spawn");
				const mushroomCount = math.random(result.settings.mushroomMin, result.settings.mushroomMax);
				for (let i = 0; i < mushroomCount; i++) {
					this.SpawnService.spawnMushroom();
				}
				print("🦌 Deer Spawn");
				const deerCount = math.random(result.settings.npcMin, result.settings.npcMax);
				for (let i = 0; i < deerCount; i++) {
					this.SpawnService.spawnDeer();
				}
				//* Spawn users
				const roles = this.getRoles();
				roles.users.forEach((user) => {
					this.SpawnService.spawnUser(user);
				});
				roles.hunters.forEach((hunter) => {
					this.SpawnService.spawnHunter(hunter);
				});
			} else if (Rounds.Survive === current) {
				this.MapService.highlightWinning();
				//* wendigo spawns
				const players = this.SpawnService.getPlayers();
				players.forEach((player) => {
					this.SpawnService.spawnWendigo(player);
				});
			} else if (Rounds.Detection === current) {
				const safeHunters = CollectionService.GetTagged(Roles.safeHunter).size();

				if (safeHunters <= 0) {
					this.RoundService.win(Roles.deer);
				}
				this.RoundService.next();
			} else if (Rounds.Intermission === current) {
				// round ends
				print("round ends");
				this.SpawnService.resetAll();
				this.RoundService.reset();
			}
		});
	}

	getRoles() {
		const hunters: Player[] = [];
		const users: Player[] = [];

		//* Hunter selection
		if (Settings.hunters > 0) {
			while (hunters.size() < Settings.hunters) {
				const player = this.MapService.getRandomFromFolder(Players) as Player;
				if (player && !hunters.includes(player)) {
					hunters.push(player);
				}
				task.wait();
			}
		}

		Players.GetPlayers().forEach((player) => {
			if (!hunters.includes(player)) {
				users.push(player);
			}
		});

		return { users, hunters };
	}
}
