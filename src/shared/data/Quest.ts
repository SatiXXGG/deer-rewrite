export enum EQuests {
	test = "test",
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
	[EQuests.test]: {
		title: "Click the part",
		reward: ["cash", 2000],
		max: 10,
		expires: 60,
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
