import { Service, OnStart } from "@flamework/core";
import { CollectionService, Players, RunService, SoundService, Workspace } from "@rbxts/services";
import { Events } from "server/network";
import { Roles } from "shared/types/RoleTags";
import { DataService } from "./DataService";
import getRole from "shared/utils/getRole";

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
		duration: RunService.IsStudio() ? 10 : 30,
		order: 0,
	},
	[Rounds.Voting]: {
		duration: 20,
		order: 1,
	},
	[Rounds.Loading]: {
		duration: 1,
		order: 2,
	},
	[Rounds.Hide]: {
		duration: 10,
		order: 3,
	},
	[Rounds.OnRound]: {
		duration: RunService.IsStudio() ? 30 : 120,
		order: 4,
	},
	[Rounds.Survive]: {
		duration: RunService.IsStudio() ? 30 : 60,
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
	private lastChange: number = os.time();
	private roundChange = new Set<ChangeCallback>();
	private gamingRounds = [Rounds.Hide, Rounds.Survive, Rounds.OnRound];
	private playing = "none";
	constructor(private DataService: DataService) {}
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
		this.lastChange = os.time();
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
		const elapsed = os.time() - this.lastChange;
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

				if (os.time() - this.lastChange > info.duration) {
					const Next = this.getNext();
					if (!Next) {
						this.reset();
					} else {
						this.current = Next;
					}
					this.lastChange = os.time();
					this.updateRound();
				}
				this.updateTime();
				task.wait();
			}
		});
		this.updateRound();
		coroutine.resume(loop);

		//* killing win detection

		CollectionService.GetInstanceRemovedSignal(Roles.deer).Connect((player) => {
			if (this.gamingRounds.includes(this.current)) {
				const currentDeers = CollectionService.GetTagged(Roles.deer).size();
				if (currentDeers <= 0) {
					print("No deers left 🥶");
					this.win(Roles.hunter);
				}
			}
		});

		CollectionService.GetInstanceRemovedSignal(Roles.hunter).Connect((player) => {
			if (this.gamingRounds.includes(this.current)) {
				const currentHunters = CollectionService.GetTagged(Roles.hunter).size();
				if (currentHunters <= 0) {
					print("No hunters left 🥶");
					this.win(Roles.deer);
				}
			}
		});

		const onC = (round: Rounds) => {
			if (this.gamingRounds.includes(round) && this.playing !== "game") {
				SoundService.GetDescendants().forEach((child) => {
					if (child.IsA("Sound")) {
						child.Playing = false;
						child.TimePosition = 0;
					}
				});
				const sounds = SoundService.game.GetChildren() as Sound[];
				const random = math.random(0, sounds.size() - 1);
				sounds[random].Playing = true;
				this.playing = "game";
			} else if (!this.gamingRounds.includes(round) && this.playing !== "lobby") {
				SoundService.GetDescendants().forEach((child) => {
					if (child.IsA("Sound")) {
						child.Playing = false;
						child.TimePosition = 0;
					}
				});
				const sounds = SoundService.lobby.GetChildren() as Sound[];
				const random = math.random(0, sounds.size() - 1);
				sounds[random].Playing = true;
				this.playing = "lobby";
			}
		};

		this.onChange(onC);
		onC(this.current);
	}

	get() {
		return this.current;
	}

	win(role: Roles.hunter | Roles.deer) {
		print("🥟 Role won: ", role);
		const hunters = CollectionService.GetTagged(Roles.hunter).filter((player) => player.IsA("Player")) as Player[];
		const safeHunters = CollectionService.GetTagged(Roles.safeHunter).filter((player) =>
			player.IsA("Player"),
		) as Player[];

		if (hunters.size() > 0) {
			Events.winners.set.broadcast(
				{
					id: hunters[0].UserId,
					dead: safeHunters.includes(hunters[0]),
				},
				{
					id: hunters[1] !== undefined ? hunters[1].UserId : hunters[0].UserId,
					dead:
						hunters[1] !== undefined ? safeHunters.includes(hunters[1]) : safeHunters.includes(hunters[0]),
				},
				role,
			);
		}

		Players.GetPlayers().forEach((player) => {
			const userRole = getRole(player);
			if (userRole === role) {
				this.DataService.addCash(player, 200);
			} else {
				this.DataService.addCash(player, 20);
			}
		});

		task.wait(1);
		this.reset();
	}

	reset() {
		print("🔄 Game Loop Reset");
		this.lastChange = os.time();
		this.current = Rounds.Intermission;
		this.updateRound();
	}

	decreaseTime(amount: number) {
		this.lastChange = this.lastChange - amount;
		this.updateTime();
	}

	increaseTime(amount: number) {
		this.lastChange = this.lastChange + amount;
		this.updateTime();
	}
}
