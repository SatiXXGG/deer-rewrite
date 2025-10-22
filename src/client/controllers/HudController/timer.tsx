import { useMountEffect, useUnmountEffect } from "@rbxts/pretty-react-hooks";
import React, { useEffect, useState } from "@rbxts/react";
import { Workspace } from "@rbxts/services";
import RSanity from "./sanity";

export default function RTimer() {
	const [left, setLeft] = useState(0);
	const [phase, setPhase] = useState("loading...");
	const [text, setText] = useState("loading...");
	const [conn, setConn] = useState<RBXScriptConnection>();

	// Actualiza el texto cada que cambian phase o left
	useEffect(() => {
		setText(`${phase}: ${left}`);
	}, [phase, left]);

	// Configura conexión al montar
	useMountEffect(() => {
		// Valores iniciales
		const initialPhase = Workspace.GetAttribute("phase") as string | undefined;
		const initialLeft = Workspace.GetAttribute("remaining") as number | undefined;

		if (initialPhase) setPhase(initialPhase);
		if (initialLeft !== undefined) setLeft(initialLeft);

		// Conexión al cambio de atributos
		const connection = Workspace.AttributeChanged.Connect((att) => {
			if (att === "phase") {
				const value = Workspace.GetAttribute("phase") as string | undefined;
				if (value) setPhase(value);
			} else if (att === "remaining") {
				const value = Workspace.GetAttribute("remaining") as number | undefined;
				if (value !== undefined) setLeft(value);
			}
		});

		setConn(connection);
	});

	// Limpia conexión al desmontar
	useUnmountEffect(() => {
		if (conn) conn.Disconnect();
	});

	// Render
	return phase !== "On round" ? (
		<frame
			BackgroundTransparency={1}
			key={"main"}
			Position={UDim2.fromScale(0.263932, 0.0231425)}
			Size={UDim2.fromScale(0.472136, 0.0657734)}
		>
			<textlabel
				BackgroundTransparency={1}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				key={"text"}
				Position={UDim2.fromScale(0.0360656, 0.140845)}
				Size={UDim2.fromScale(0.92623, 0.722222)}
				Text={text}
				TextColor3={new Color3(1, 1, 1)}
				TextScaled={true}
			>
				<uistroke key={"UIStroke"} Thickness={4.2} />
			</textlabel>
		</frame>
	) : (
		<RSanity />
	);
}
