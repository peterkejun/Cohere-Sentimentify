import { HTMLElement, Node, NodeType, TextNode } from "node-html-parser";
import { getColorOfSentiment } from "./html/colors";
import { HtmlParser } from "./html/html";
import { breakIntoSentences } from "./html/sentence";
import { getSentiments } from "./sentiment/sentiment";
export { intialize } from './cohere/cohere';

const isInterestingNode = (node: Node): boolean => {
    if (node.nodeType !== NodeType.TEXT_NODE) {
        return false;
    }
    if (node.text.trim().length === 0) {
        return false;
    }
    return true;
}

export const sentimentifyHtml = async (html: string): Promise<string> => {
    const parser = new HtmlParser(html);
    const nodes = parser.filterHtml(isInterestingNode);
    const inputs: { id: number, node: Node, text: string }[] = [];
    for (let node of nodes) {
        const sentences = breakIntoSentences(node.node.text);
        for (let sentence of sentences) {
            inputs.push({ id: node.id, node: node.node, text: sentence });
        }
    }
    const results = await getSentiments(inputs.map(i => i.text));
    const classified = results.map((result, i) => ({ ...inputs[i], result }));
    const newElements = new Map<number, { node: Node, element: HTMLElement}>();
    for (let { id, node, text, result } of classified) {
        if (!newElements.has(id)) {
            const outerSpan = new HTMLElement('span', {}, null, null, null);
            newElements.set(id, { node, element: outerSpan});
        } 
        const color = getColorOfSentiment(result.sentiment, result.confidence);
        const span = new HTMLElement('span', {}, `style="background-color: ${color.getHex()};"`, null, null);
        span.set_content(text);
        const { node: _node, element } = newElements.get(id);
        element.appendChild(span);
        newElements.set(id, { node: _node, element });
    }
    const options = new Map<Node, HTMLElement>();
    newElements.forEach(({ node, element }, _) => options.set(node, element));
    parser.modifyHtml(options);
    const newHtml = parser.getHtml();
    return newHtml;
}


