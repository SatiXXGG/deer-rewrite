import { Players } from "@rbxts/services";
import { useState, useEffect } from "@rbxts/react";
import useAttribute from "client/controllers/hooks/useAttribute";

export default function useDailyRewardStatus() {
	const streak = useAttribute(Players.LocalPlayer, "streak", 1) ?? 1;
	const claimedAttr = useAttribute(Players.LocalPlayer, "claimed", false) ?? false;
	const lastReward = useAttribute(Players.LocalPlayer, "lastReward", 0) ?? 0;

	const [claimed, setClaimed] = useState(claimedAttr);
	const [currentStreak, setStreak] = useState(streak);

	useEffect(() => {
		setClaimed(claimedAttr);
		setStreak(streak);
	}, [claimedAttr, streak]);

	useEffect(() => {
		const oneDay = 60 * 60 * 24;
		const interval = task.spawn(() => {
			while (Players.LocalPlayer) {
				const now = os.time();
				const timePassed = now - lastReward;

				// Resetea claimed si pasó 24h
				if (timePassed >= oneDay && claimed) {
					setClaimed(false);
				}

				// Reinicia streak si pasó 48h
				if (timePassed >= oneDay * 2 && currentStreak !== 0) {
					setStreak(0);
				}

				task.wait(60);
			}
		});

		return () => task.cancel(interval);
	}, [lastReward, claimed, currentStreak]);

	return { claimed, streak: currentStreak };
}
