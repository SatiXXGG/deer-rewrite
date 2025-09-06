import { Service, OnStart } from "@flamework/core";
import { DataService } from "./DataService";
import { EQuests, GetQuestData, IQuestData } from "shared/data/Quest";
import { Events, Functions } from "server/network";
import { onPlayerJoined } from "server/modding/onPlayerJoined/interface";

@Service({})
export class QuestService implements OnStart, onPlayerJoined {
	private daily: EQuests[] = [EQuests.test];
	constructor(private DataService: DataService) {}
	onStart() {
		Functions.quests.getQuests.setCallback((player) => {
			return this.getQuests(player);
		});
	}
	giveQuest(player: Player, quest: EQuests) {
		const info: IQuestData = {
			id: tick(),
			current: 0,
			reference: quest,
		};

		const profile = this.DataService.getProfile(player);
		profile.Data.quests.push(info);
		return info;
	}

	questExpired(player: Player, id: number) {
		const profile = this.DataService.getProfile(player);
		const index = profile.Data.quests.findIndex((quest) => quest.id === id);
		if (index > -1) {
			const info = profile.Data.quests[index];
			const elapsed = tick() - info.id;
			const data = GetQuestData(info.reference);
			if (data.expires < elapsed / 60) {
				return true;
			}
		}
		return false;
	}

	cleanExpired(player: Player) {
		const profile = this.DataService.getProfile(player);
		profile.Data.quests = profile.Data.quests.filter((quest) => !this.questExpired(player, quest.id));
	}

	getQuests(player: Player) {
		const profile = this.DataService.getProfile(player);
		return profile.Data.quests;
	}

	incrementQuests(player: Player, reference: EQuests) {
		const profile = this.DataService.getProfile(player);
		const index = profile.Data.quests.findIndex((quest) => quest.reference === reference);
		if (index > -1) {
			const data = GetQuestData(reference);
			const info = profile.Data.quests[index];
			if (info.current >= data.max) {
				warn("Quest is maxed");
			}
			info.current += 1;
			Events.quests.updateQuest.fire(player, info.id, info.current);
		}
	}

	onJoin(player: Player): void {
		this.DataService.waitForLoad(player).then(() => {
			const profile = this.DataService.getProfile(player);
			const ct = tick();
			this.cleanExpired(player);

			if (profile.Data.gaveDailyQuests === 0 || ct - profile.Data.gaveDailyQuests > 60 * 60 * 24) {
				print("🌦️ Gave daily quests");
				this.daily.forEach((quest) => {
					this.giveQuest(player, quest);
				});
			}
		});
	}
}
