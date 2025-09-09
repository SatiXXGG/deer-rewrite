import { useEffect, useRef, useState, useMemo } from "@rbxts/react";
import { Trove } from "@rbxts/trove";

interface IElapsed {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

interface Options {
	invert?: boolean;
	maxDays?: number;
}

export default function useElapsed(start: number, options?: Options) {
	const [elapsed, setElapsed] = useState<IElapsed>({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});
	const uuid = useRef(os.time() + math.random(1, 9999));
	const trove = useRef(new Trove());

	const bindName = useMemo(() => "elapsed_" + tostring(uuid.current), [uuid]);

	useEffect(() => {
		trove.current.clean();

		trove.current.bindToRenderStep(bindName, Enum.RenderPriority.Last.Value, () => {
			let seconds: number;

			if (options?.invert && options.maxDays !== undefined) {
				const maxSeconds = options.maxDays * 86400;
				const used = math.max(0, math.floor(os.time() - start));
				seconds = math.max(0, maxSeconds - used);
			} else {
				seconds = math.max(0, math.floor(os.time() - start));
			}

			setElapsed({
				days: math.floor(seconds / 86400),
				hours: math.floor((seconds % 86400) / 3600),
				minutes: math.floor((seconds % 3600) / 60),
				seconds: math.floor(seconds % 60),
			});
		});

		return () => trove.current.clean();
	}, [start, options?.invert, options?.maxDays, bindName]);

	return elapsed;
}
