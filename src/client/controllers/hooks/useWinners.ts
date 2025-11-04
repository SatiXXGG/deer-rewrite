import { useMountEffect } from "@rbxts/pretty-react-hooks";
import { useEffect, useState } from "@rbxts/react";
import { Events } from "client/network";
import { Roles } from "shared/types/RoleTags";
import { WinnerState } from "../states/winnerState";

export default function useWinner() {
	const [winnerRole, setWinnerRole] = useState<Roles>(WinnerState.role);
	const [hunters, setHunters] = useState(WinnerState.hunters);

	// 🔹 Cuando se recibe un evento de ganador
	useEffect(() => {
		const x = WinnerState.onChange.Connect(() => {
			const { role, hunters } = WinnerState.get();
			setWinnerRole(role);
			setHunters(hunters);
		});
		warn("Winner state", WinnerState.get());
		return () => x.Disconnect();
	}, []);

	// 🔹 Cuando el hook se monta, sincroniza con el estado global actual
	useMountEffect(() => {
		const { role, hunters } = WinnerState.get();
		setWinnerRole(role);
		setHunters(hunters);
	});

	// 🔹 Si el estado global cambia (desde otro hook), React no lo sabrá.
	// Para forzar la persistencia real, podríamos usar un event bridge:
	// WinnerState podría emitir señales (via `Signal` o `BindableEvent`) y aquí escucharlas.
	// Pero si sólo se usa un hook a la vez, esto no hace falta.

	return {
		winnerRole,
		hunters,
		reset: () => {
			WinnerState.reset();
			setWinnerRole(Roles.none);
			setHunters(undefined);
		},
	};
}
