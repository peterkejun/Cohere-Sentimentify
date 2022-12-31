import { HTMLElement, Node, NodeType, parse } from 'node-html-parser';
import { NodeWithID } from './types';

class HtmlParser {
    private root: HTMLElement;

    constructor(html: string) {
        this.root = parse(html); 
    }

    generator(): Generator<NodeWithID> {
        let id = 0;
        const makeYield = (node: Node): NodeWithID => {
            const data = { node, id };
            id++;
            return data;
        }
        function *dfs(node: Node): Generator<NodeWithID> {
            yield makeYield(node);
            for (let child of node.childNodes) {
                yield *dfs(child);
            }
        }
        return dfs(this.root);
    }
}

const isInterestingNode = (node: Node): boolean => {
    if (node.nodeType !== NodeType.TEXT_NODE) {
        return false;
    }
    if (node.text.trim().length === 0) {
        return false;
    }
    return true;
}

export const parseHtml = (html: string): NodeWithID[] => {
    const parser = new HtmlParser(html);
    const generator = parser.generator();
    
    let iter = generator.next();
    const texts: NodeWithID[] = [];
    while (!iter.done) {
        const nodeWithId = iter.value as NodeWithID;
        iter = generator.next();
        const { id, node } = nodeWithId;
        if (isInterestingNode(node)) {
            texts.push(nodeWithId);
        }
    }
    
    return texts;
}