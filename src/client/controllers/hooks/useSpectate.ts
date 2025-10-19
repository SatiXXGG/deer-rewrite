import { useTagged } from "@rbxts/pretty-react-hooks";
import { useEffect, useState } from "@rbxts/react";
import { Players, Workspace } from "@rbxts/services";
import { ICharacter } from "shared/components/types/Character";
import { Roles } from "shared/types/RoleTags";

export default function useSpectate() {
	const [childs, setChilds] = useState<ICharacter[]>([]);
	const [currentIndex, setCurrent] = useState(0);
	const [name, setName] = useState("");
	const tagged = useTagged<Player>(Roles.playing);

	const NextUser = () => {
		const nextIndex = currentIndex + 1;
		if (nextIndex > tagged.size() - 1) {
			setCurrent(0);
		} else {
			setCurrent(nextIndex);
		}
	};

	const reset = () => {
		setCurrent(0);
	};

	const prev = () => {
		const prevIndex = currentIndex - 1;
		if (prevIndex < 0) {
			setCurrent(tagged.size() - 1);
		} else {
			setCurrent(prevIndex);
		}
	};

	useEffect(() => {
		const exists = tagged.filter((player) => player.Character !== undefined && player !== Players.LocalPlayer);
		const toSpectate = [Players.LocalPlayer, ...exists];
		setChilds(toSpectate.map((player) => player.Character as ICharacter));
	}, [tagged]);

	useEffect(() => {
		print(childs);
		if (childs[currentIndex]) {
			const user = childs[currentIndex];
			const currentCamera = Workspace.CurrentCamera!;
			if (user) {
				setName(user.Name);
				currentCamera.CameraSubject = user.Humanoid;
			}
		}
	}, [currentIndex, childs]);

	return { childs, NextUser, prev, name, reset };
}
