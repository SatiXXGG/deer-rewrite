import { Service, OnStart } from "@flamework/core";
import { DataService } from "./DataService";
import { EQuests, EQuestStatus, GetQuestData, IQuestData } from "shared/data/Quest";
import { Events, Functions } from "server/network";
import { onPlayerJoined } from "server/modding/onPlayerJoined/interface";

@Service({})
export class QuestService implements OnStart, onPlayerJoined {
	private daily: EQuests[] = [EQuests.kill10deer];
	private weekly: EQuests[] = [EQuests.kill50deer];

	constructor(private DataService: DataService) {}
	onStart() {
		Functions.quests.getQuests.setCallback((player) => {
			return this.getQuests(player);
		});

		Events.quest.claim.connect((player, id) => {
			this.claim(player, id);
		});
	}
	giveQuest(player: Player, quest: EQuests) {
		const info: IQuestData = {
			id: os.time(),
			current: 0,
			reference: quest,
			status: EQuestStatus.Active,
		};

		const profile = this.DataService.getProfile(player);
		profile.Data.quests.push(info);
		return info;
	}

	claim(player: Player, id: number) {
		const profile = this.DataService.getProfile(player);
		const index = profile.Data.quests.findIndex((quest) => quest.id === id);
		if (index > -1) {
			const info = profile.Data.quests[index];
			if (info.status !== EQuestStatus.Completed) return;
			info.status = EQuestStatus.Claimed;
			Events.quests.updateQuest.fire(player, info.id, info.current, info.status);
			//* reward logic

			const data = GetQuestData(info.reference);
			const [reward, amount] = data.reward;

			switch (reward) {
				case "cash":
					this.DataService.addCash(player, amount);
					break;
			}
		}
	}

	questExpired(player: Player, id: number) {
		const profile = this.DataService.getProfile(player);
		const index = profile.Data.quests.findIndex((quest) => quest.id === id);
		if (index > -1) {
			const info = profile.Data.quests[index];
			const elapsed = os.time() - info.id;
			const data = GetQuestData(info.reference);
			print(elapsed / 60, data.expires);
			if (elapsed / 60 > data.expires) {
				return true;
			}
		}
		return false;
	}

	cleanExpired(player: Player) {
		const profile = this.DataService.getProfile(player);
		profile.Data.quests = profile.Data.quests.filter((quest) => {
			const isExpired = this.questExpired(player, quest.id);
			warn("expired: ", quest.reference, isExpired);
			return !isExpired;
		});
	}

	getQuests(player: Player) {
		const profile = this.DataService.getProfile(player);
		print(profile.Data.quests);
		return profile.Data.quests;
	}

	incrementQuests(player: Player, reference: EQuests) {
		const profile = this.DataService.getProfile(player);
		const index = profile.Data.quests.findIndex((quest) => quest.reference === reference);
		if (index > -1) {
			const data = GetQuestData(reference);
			const info = profile.Data.quests[index];
			if (info.current >= data.max && info.status === EQuestStatus.Active) {
				info.status = EQuestStatus.Completed;
				this.finishedQuest(player, info.id);
			}
			if (info.current < data.max) {
				info.current += 1;
				Events.quests.updateQuest.fire(player, info.id, info.current, info.status);
			}
		}
	}

	onJoin(player: Player): void {
		this.DataService.waitForLoad(player).then(() => {
			const profile = this.DataService.getProfile(player);
			const ct = os.time();
			this.cleanExpired(player);

			if (profile.Data.gaveDailyQuests === 0 || ct - profile.Data.gaveDailyQuests > 60 * 60 * 24) {
				print("🌦️ Gave daily quests");
				this.daily.forEach((quest) => {
					this.giveQuest(player, quest);
				});
				profile.Data.gaveDailyQuests = ct;
			}

			if (profile.Data.gaveWeeklyQuests === 0 || ct - profile.Data.gaveWeeklyQuests > 60 * 60 * 24 * 7) {
				print("🌦️ Gave weekly quests");
				this.weekly.forEach((quest) => {
					this.giveQuest(player, quest);
				});
				profile.Data.gaveWeeklyQuests = ct;
			}

			player.SetAttribute("gaveWeeklyQuests", profile.Data.gaveWeeklyQuests);
			player.SetAttribute("gaveDailyQuests", profile.Data.gaveDailyQuests);
		});
	}

	finishedQuest(player: Player, id: number) {
		const profile = this.DataService.getProfile(player);
		const index = profile.Data.quests.findIndex((quest) => quest.id === id);
		if (index > -1) {
			const info = profile.Data.quests[index];
			Events.quests.updateQuest.fire(player, info.id, info.current, info.status);
		}
	}
}
