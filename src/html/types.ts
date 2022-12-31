import { Node } from "node-html-parser";
import { Color } from "./colors";

export interface NodeWithID {
    id: number,
    node: Node,
}

export interface ColorConstructorOptions {
    rgb?: [number, number, number],
    hex?: string,
    alpha?: number,
}

export interface RenderHtmlOptions {
    color: Color,
}
