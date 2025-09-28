import { useMountEffect } from "@rbxts/pretty-react-hooks";
import { useEffect, useState } from "@rbxts/react";
import { Events } from "client/network";
import { Roles } from "shared/types/RoleTags";

interface IHunterInfo {
	id: number;
	dead: boolean;
}

export default function useWinner() {
	const [winnerRole, setWinnerRole] = useState<Roles>(Roles.none);
	const [hunters, setHunters] = useState<[IHunterInfo, IHunterInfo] | undefined>(undefined);

	useEffect(() => {
		const conn = Events.winners.set.connect((h1, h2, role) => {
			setHunters([h1, h2]);
			setWinnerRole(role);
		});

		return () => {
			conn.Disconnect();
		};
	}, []);

	useMountEffect(() => {});
	return { winnerRole, reset: () => setWinnerRole(Roles.none), hunters };
}
