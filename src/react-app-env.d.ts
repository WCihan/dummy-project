/// <reference types="react-scripts" />

declare module '*.svg' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	export const ReactComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
	const src: string;
	export default src;
}
