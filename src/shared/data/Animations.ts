interface IBaseAnims {
	idle: string;
	run: string;
	walk: string;
}

interface IDeerAnims extends IBaseAnims {
	transformation: string;
	eating: string;
	taunt: string;
	walk: string;
}

interface IWendigoAnims extends IBaseAnims {
	transformation: string;
	attackL: string;
	attackR: string;
	scream: string;
}

export const DeerAnimations: IDeerAnims = {
	idle: "rbxassetid://78646183339693",
	run: "rbxassetid://90983243846340",
	transformation: "rbxassetid://84157376119210",
	walk: "rbxassetid://125899269116814",
	taunt: "rbxassetid://114179784112201",
	eating: "rbxassetid://95470529033464",
};

export const WendigoAnimations: IWendigoAnims = {
	idle: "rbxassetid://136327909974617",
	run: "rbxassetid://91045416813442",
	walk: "rbxassetid://91045416813442",
	transformation: "rbxassetid://132137730606156",
	attackL: "rbxassetid://98269989612371",
	attackR: "rbxassetid://90940103924981",
	scream: "rbxassetid://109872681084545",
};
