import { ICharacter } from "shared/components/types/Character";

export interface IToolScheme {
	equipped(character: ICharacter): void;
	unequipped(character: ICharacter): void;
	setup(character: ICharacter): void;
	tool?: Tool;
}
