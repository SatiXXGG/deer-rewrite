interface ServerStorage extends Instance {
	maps: Folder;
	tools: Folder;
	npc: Folder;
	effects: Folder & {
		taunt: Folder;
	};
	assets: Folder & {
		trap: Model;
		mushroom: Model;
		cash: BasePart;
	};
}
