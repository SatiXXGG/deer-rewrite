import { Flamework } from "@flamework/core";
import { Events } from "./network";
import { WinnerState } from "./controllers/states/winnerState";

Flamework.addPaths("src/client/components");
Flamework.addPaths("src/client/controllers");
Flamework.addPaths("src/client/modding");
Flamework.addPaths("src/shared/components");

Flamework.ignite();

Events.winners.set.connect((h1, h2, role) => {
	warn("set winner event", h1, h2, role);
	WinnerState.set(role, [h1, h2]);
});
