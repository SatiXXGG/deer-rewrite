export interface ICharacter extends Model {
	Humanoid: Humanoid & {
		Animator: Animator;
	};
	HumanoidRootPart: Part;
}

export interface IDeerSkin extends ICharacter {
	taunt: Attachment;
}
