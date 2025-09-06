import { Service, OnStart } from "@flamework/core";
import { Workspace } from "@rbxts/services";
import { Roles } from "shared/types/RoleTags";

export enum Rounds {
	Intermission = "Intermission",
	Voting = "Voting",
	Loading = "Loading",
	Hide = "Hide",
	OnRound = "On round",
	Survive = "Survive",
	Detection = "Restarting",
}

interface RoundInfo {
	duration: number;
	order: number;
}

const RoundsInfo: Record<Rounds, RoundInfo> = {
	[Rounds.Intermission]: {
		duration: 5,
		order: 0,
	},
	[Rounds.Voting]: {
		duration: 5,
		order: 1,
	},
	[Rounds.Loading]: {
		duration: 5,
		order: 2,
	},
	[Rounds.Hide]: {
		duration: 5,
		order: 3,
	},
	[Rounds.OnRound]: {
		duration: 50,
		order: 4,
	},
	[Rounds.Survive]: {
		duration: 60,
		order: 5,
	},
	[Rounds.Detection]: {
		duration: 99999999,
		order: 6,
	},
};

type ChangeCallback = (round: Rounds) => void;
@Service({})
export class RoundService implements OnStart {
	private current: Rounds = Rounds.Intermission;
	private lastChange: number = tick();
	private roundChange = new Set<ChangeCallback>();
	getNext() {
		const currentInfo = RoundsInfo[this.current];
		const currentN = currentInfo.order;
		const goal = currentN + 1;
		for (const [round, value] of pairs(RoundsInfo)) {
			if (value.order === goal) {
				return round;
			}
		}
	}
	next() {
		const Next = this.getNext();
		if (!Next) {
			this.reset();
		} else {
			this.current = Next;
		}
		this.lastChange = tick();
		this.updateRound();
	}

	onChange(callback: ChangeCallback) {
		this.roundChange.add(callback);
	}

	updateRound() {
		Workspace.SetAttribute("phase", this.current);
		this.roundChange.forEach((callback) => task.spawn(callback, this.current));
	}

	updateTime() {
		const elapsed = tick() - this.lastChange;
		const info = RoundsInfo[this.current];
		if (!info) {
			error("Invalid round info: " + this.current);
		}
		const remaining = info.duration - elapsed;
		Workspace.SetAttribute("remaining", math.floor(remaining));
		Workspace.SetAttribute("total", info.duration);
	}
	onStart() {
		const loop = coroutine.create(() => {
			while (game) {
				const info = RoundsInfo[this.current];

				if (tick() - this.lastChange > info.duration) {
					const Next = this.getNext();
					if (!Next) {
						this.reset();
					} else {
						this.current = Next;
					}
					this.lastChange = tick();
					this.updateRound();
				}
				this.updateTime();
				task.wait();
			}
		});
		this.updateRound();
		coroutine.resume(loop);
	}

	get() {
		return this.current;
	}

	win(role: Roles.hunter | Roles.deer) {
		print("🥟 Role won: ", role);
		this.reset();
	}

	reset() {
		print("🔄 Game Loop Reset");
		this.current = Rounds.Intermission;
	}
}
