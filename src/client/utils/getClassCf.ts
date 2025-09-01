import { EItemClass } from "shared/types/GameItem";

export default function getClassCf(Class: EItemClass) {
	if (Class === EItemClass.wendigo) {
		return new CFrame(0, 0, -8).mul(CFrame.Angles(0, math.rad(180), 0));
	}

	return new CFrame();
}
