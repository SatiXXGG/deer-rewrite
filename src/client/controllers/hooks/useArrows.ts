import { Players, RunService } from "@rbxts/services";
import useAttribute from "./useAttribute";
import { useEffect, useState } from "@rbxts/react";
const player = Players.LocalPlayer;

export default function useArrows() {
	const currentArrows = useAttribute(player, "arrows", 3) ?? 3;
	const lastTick = useAttribute(player, "lastArrowTick", 3) ?? 3;
	const [percentage, setPercentage] = useState(1);
	const [isFull, setIsFull] = useState(true);

	useEffect(() => {
		RunService.BindToRenderStep("arrowRegen", Enum.RenderPriority.Last.Value, () => {
			if (currentArrows < 3) {
				setIsFull(false);
			}
			const elapsed = tick() - lastTick;
			setPercentage(math.clamp(elapsed / 3, 0, 1));

			if (elapsed >= 3) {
				setIsFull(true);
				setPercentage(1);
				RunService.UnbindFromRenderStep("arrowRegen");
			}
		});

		return () => {
			RunService.UnbindFromRenderStep("arrowRegen");
		};
	}, [currentArrows]);

	return { currentArrows, isFull, percentage };
}
