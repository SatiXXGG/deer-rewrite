import { useMountEffect, useUnmountEffect } from "@rbxts/pretty-react-hooks";
import { useRef, useState } from "@rbxts/react";
import { Trove } from "@rbxts/trove";

export default function useAttribute<T>(instance: Instance, attribute: string, defaultValue: T) {
	const [value, setValue] = useState<T>();
	const trove = useRef<Trove>(new Trove());

	useMountEffect(() => {
		const current = (instance.GetAttribute(attribute) as T | undefined) ?? defaultValue;
		if (current !== undefined) {
			setValue(current);
		}
		trove.current.connect(instance.GetAttributeChangedSignal(attribute), () => {
			const current = (instance.GetAttribute(attribute) as T | undefined) ?? defaultValue;
			setValue(current);
		});
	});

	useUnmountEffect(() => {
		trove.current.clean();
	});

	return value;
}
