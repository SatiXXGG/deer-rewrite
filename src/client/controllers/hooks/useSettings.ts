import { useMountEffect } from "@rbxts/pretty-react-hooks";
import { useEffect, useState } from "@rbxts/react";
import { Events, Functions } from "client/network";
import { EUserSetting, TUserSettings } from "shared/data/UserSettings";

export default function useSetting(setting: EUserSetting) {
	const info = TUserSettings[setting];
	const [value, setValue] = useState(info.value);

	useMountEffect(() => {
		Functions.settings.get.invoke(setting).then((value) => {
			setValue(value);
		});

		info.action(value);
	});

	useEffect(() => {
		info.action(value);
		Events.settings.set.fire(setting, value);
	}, [value]);

	return { value, setValue };
}
