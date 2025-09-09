import { Service, OnStart } from "@flamework/core";
import { onPlayerJoined } from "server/modding/onPlayerJoined/interface";
import { DataService } from "./DataService";

@Service({})
export class SettingsService implements OnStart, onPlayerJoined {
	constructor(private DataService: DataService) {}
	onStart() {}
	onJoin(Player: Player): void {
		/** Settings setup */
		this.DataService.waitForLoad(Player).then(() => {});
	}
}
