import Make from "@rbxts/make";
import { useMountEffect } from "@rbxts/pretty-react-hooks";
import React, { useRef } from "@rbxts/react";

interface Props extends React.PropsWithChildren {
	readonly ExtraCameraDepth?: number;
	readonly Native: React.InstanceProps<ViewportFrame>;
	readonly Object: BasePart | Model;
	readonly cf?: CFrame;
}

function setDefaultCameraView(camera: Camera, model: Model, cameraDepth = 0): void {
	const [modelCF] = model.GetBoundingBox();

	const radius = model.GetExtentsSize().Magnitude / 2;
	const halfFov = math.rad(camera.FieldOfView) / 2;
	const depth = radius / math.tan(halfFov) + cameraDepth;

	// 1. Remove translation
	// 2. Move to model position
	// 3. Push camera back by depth in the original angle given
	camera.CFrame = camera.CFrame.sub(camera.CFrame.Position)
		.add(modelCF.Position)
		.add(camera.CFrame.Position.sub(modelCF.Position).Unit.mul(depth));
}

/**
 * Renders a viewport for displaying an object.
 *
 * @param props - The component props.
 * @param props.ExtraCameraDepth - Additional depth to push the camera back.
 * @param props.Native - The native props to a viewport.
 * @param props.Object - The object to be displayed in the viewport.
 * @param props.children - The child elements.
 * @returns The rendered viewport.
 * @component
 * @example
 *
 * ```tsx
 * <ObjectViewport
 * 	Native={{ Size: new UDim2(1, 0, 1, 0) }}
 * 	Object={new Part()}
 * />;
 * ```
 *
 */
export default function ObjectViewport({ ExtraCameraDepth, Native, Object, children, cf }: Props): React.Element {
	// Setup the viewport after mounting when we have a ref to it
	const viewportRef = useRef<ViewportFrame>();

	useMountEffect(() => {
		const viewport = viewportRef.current;
		assert(viewport !== undefined, "Viewport is not defined");

		let model = Object;
		if (!model.IsA("Model")) {
			model = Make("Model", {
				Children: [Object],
				PrimaryPart: Object as BasePart,
			});
		}

		model.Parent = viewport;

		const viewportCamera = new Instance("Camera");
		viewport.CurrentCamera = viewportCamera;
		setDefaultCameraView(viewportCamera, model, ExtraCameraDepth);
		viewportCamera.Parent = viewport;

		if (cf !== undefined) {
			viewportCamera.CFrame = cf;
		}
	});

	return (
		<viewportframe {...Native} ref={viewportRef}>
			{children}
		</viewportframe>
	);
}
