import { useEffect, useState } from "@rbxts/react";
import { EPlayerState, PlayerState } from "../data/State";

export default function useUserState(state: EPlayerState) {
	const [active, setCooldown] = useState(false);
	useEffect(() => {
		const onAdd = PlayerState.onAdd((stat) => {
			if (state === stat) {
				setCooldown(true);
			}
		});
		const onRemove = PlayerState.onRemove((stat) => {
			if (state === stat) {
				setCooldown(false);
			}
		});

		return () => {
			onAdd.clear();
			onRemove.clear();
		};
	});

	return active;
}
