export enum EQuests {
	kill10deer = "kill10deer",
	kill50deer = "kill50deer",
}

export interface IQuestData {
	id: number;
	current: number;
	reference: EQuests;
	status: EQuestStatus;
}

export enum EQuestStatus {
	Active = "active",
	Completed = "completed",
	Claimed = "claimed",
}

export interface IQuestInfo {
	title: string;
	reward: [string, number];
	max: number;
	expires: number; // time in minutes
}

export interface IQuest extends IQuestInfo, IQuestData {}

export const QuestsData: { [key: string]: IQuestInfo } = {
	[EQuests.kill10deer]: {
		title: "Kill 10 players",
		reward: ["cash", 1000],
		max: 10,
		expires: 60 * 23,
	},
	[EQuests.kill50deer]: {
		title: "Kill 50 players",
		reward: ["cash", 10000],
		max: 50,
		expires: 60 * 23 * 7,
	},
};

export function GetQuest(data: IQuestData) {
	const info = QuestsData[data.reference];
	return {
		...data,
		...info,
	} as IQuest;
}

export function GetQuestData(quest: EQuests) {
	const info = QuestsData[quest];
	return info;
}
