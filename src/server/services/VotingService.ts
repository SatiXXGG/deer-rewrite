import { Service, OnStart } from "@flamework/core";
import { ServerStorage, Workspace } from "@rbxts/services";

interface MapSettings {
	display: string;
	icon: string;
	npcMin: number;
	mushroomMin: number;
	npcMax: number;
	mushroomMax: number;
}

interface VotingMap {
	name: string;
	votes: number[];
	settings: MapSettings;
}

export interface MapModel extends Model {
	settings: Configuration;
	npcSpawns: Folder;
	hunterSpawns: Folder;
	spawnZone: BasePart;
	map: Model; // base map
}

export interface VotingModel extends Model {
	hitbox: BasePart;
	screen: BasePart & {
		ui: SurfaceGui & {
			name: Frame & {
				name: TextLabel;
			};
			votes: Frame & {
				votes: TextLabel;
			};
			mapImage: ImageLabel;
		};
	};
}

export type VotingInstance = {
	finish: () => VotingMap;
};
@Service({})
export class VotingService implements OnStart {
	private maps = ServerStorage.maps;
	private mapRequiredChilds = ["npcSpawns", "hunterSpawns", "spawnZone"];
	private votes = Workspace.votes;
	private currentMaps: VotingMap[] = [];
	getAtt<T>(att: string, instance: Configuration) {
		const got = instance.GetAttribute(att) as T | undefined;
		assert(got !== undefined, `Map Missing attribute ${att} on ${instance.GetFullName()}`);
		return got;
	}

	getMapSettings(map: MapModel): MapSettings {
		assert(map.settings, "Missing settings in map: " + map.Name);
		const configuration = map.settings;
		return {
			display: this.getAtt<string>("display", configuration),
			icon: this.getAtt<string>("icon", configuration),
			npcMin: this.getAtt<number>("npcMin", configuration),
			npcMax: this.getAtt<number>("npcMax", configuration),
			mushroomMin: this.getAtt<number>("mushroomMin", configuration),
			mushroomMax: this.getAtt<number>("mushroomMax", configuration),
		};
	}

	getSettingsByName(name: string) {
		const map = this.maps.FindFirstChild(name) as MapModel | undefined;
		if (map) {
			return this.getMapSettings(map);
		}
	}

	depureMaps() {
		const maps = this.maps.GetChildren();
		maps.forEach((map) => {
			if (!map.IsA("Model")) {
				warn("❌ Invalid Map: " + map.Name);
				map.Destroy();
				return;
			}
			this.mapRequiredChilds.forEach((name) => {
				const found = map.FindFirstChild(name);
				assert(found, "Missing child " + name + " on map " + map.Name);
			});
			this.getMapSettings(map as MapModel);
			print("🌎 Clean Map: " + map.Name);
		});
	}

	onStart() {
		this.depureMaps();
	}

	createVoting(map: MapModel) {
		const settings = this.getMapSettings(map);
		const votingMap: VotingMap = {
			name: map.Name,
			votes: [],
			settings: settings,
		};
		return votingMap;
	}

	pickRandomMaps(amount: number) {
		const gotMaps: MapModel[] = [];
		let got = 0;
		const childs = this.maps.GetChildren();

		while (got < amount) {
			const result = childs[math.random(0, childs.size() - 1)];
			if (!gotMaps.includes(result as MapModel)) {
				gotMaps.push(result as MapModel);
				got += 1;
			}
		}

		return gotMaps;
	}

	updateVotes() {
		if (this.currentMaps) {
			this.currentMaps.forEach((map, index) => {
				const vote = this.votes.FindFirstChild(index) as VotingModel | undefined;
				if (vote) {
					vote.screen.ui.name.name.Text = map.name;
					vote.screen.ui.votes.votes.Text = tostring(map.votes.size());
					vote.SetAttribute("name", map.name);
					vote.SetAttribute("votes", map.votes.size());
					vote.SetAttribute("icon", map.settings.icon);
				}
			});
		}
	}

	startVoting(): VotingInstance {
		print("✉️ Voting Instance Created");
		this.currentMaps = [];
		const random = this.pickRandomMaps(3);
		random.forEach((map) => {
			const info = this.createVoting(map);
			this.currentMaps.push(info);
		});

		this.updateVotes();
		return {
			finish: () => {
				return this.currentMaps.reduce((max, item) => {
					if (item.votes.size() > max.votes.size()) {
						return item;
					}
					return max;
				});
			},
		};
	}

	voteTo(name: string, userId: number) {
		this.removeVote(userId);
		if (this.currentMaps) {
			this.currentMaps.forEach((map) => {
				if (map.name === name) {
					map.votes.push(userId);
				}
			});
		}

		this.updateVotes();
	}

	removeVote(userId: number) {
		if (this.currentMaps) {
			this.currentMaps.forEach((map) => {
				if (map.votes.includes(userId)) {
					const index = map.votes.indexOf(userId);
					map.votes.remove(index);
				}
			});

			this.updateVotes();
		}
	}
}
