interface ReplicatedStorage extends Instance {
	projectiles: Folder; // Folder for bow projectiles
	deathEffects: Folder; // Folder for death effects
	skins: Folder & {
		wendigo: Folder;
		deer: Folder & {
			default: Model;
		};
		bow: Folder;
	};
}
