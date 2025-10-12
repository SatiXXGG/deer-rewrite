interface Workspace extends Instance {
	votes: Folder;
	openers: Folder & {
		quests: BasePart;
		shop: BasePart;
	};
}
