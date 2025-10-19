import { useMountEffect, useUnmountEffect } from "@rbxts/pretty-react-hooks";
import { useEffect, useRef, useState } from "@rbxts/react";
import { CollectionService, Players } from "@rbxts/services";
import { Trove } from "@rbxts/trove";
import { Roles } from "shared/types/RoleTags";

export default function useHunger(initial: number = 1500) {
	const player = Players.LocalPlayer;
	const [hunger, setHunger] = useState(initial);
	const [percentage, setPercentage] = useState(1);
	const trove = useRef<Trove>(new Trove());

	//* UI labs
	useEffect(() => {
		setHunger(initial);
	}, [initial]);

	useEffect(() => {
		setPercentage(hunger / 1500);
	}, [hunger]);

	useMountEffect(() => {
		if (!player) return () => {};
		trove.current.connect(player.GetAttributeChangedSignal("Hunger"), () => {
			const currentHunger = (player.GetAttribute("Hunger") as number | undefined) ?? 0;
			setHunger(currentHunger);
		});

		trove.current.connect(CollectionService.GetInstanceRemovedSignal(Roles.deer), (instance) => {
			if (instance === player) {
				trove.current.clean();
			}
		});
	});

	useUnmountEffect(() => {
		trove.current.clean();
	});

	return { hunger, percentage };
}
