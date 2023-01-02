import { HTMLElement, Node, NodeType, parse } from 'node-html-parser';
import { NodeWithID, RenderHtmlOptions } from './types';

export class HtmlParser {
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

    modifyHtml(options: Map<Node, HTMLElement>) {
        const dfs = (node: Node) => {
            if (options.has(node)) {
                node.parentNode.exchangeChild(node, options.get(node));
            } else {
                for (let child of node.childNodes) {
                    dfs(child);
                }
            }
        }
        dfs(this.root);
    }

    getHtml(): string {
        return this.root.outerHTML;
    }

    filterHtml(filter: (node: Node) => boolean): NodeWithID[] {
        const generator = this.generator();
        
        let iter = generator.next();
        const texts: NodeWithID[] = [];
        while (!iter.done) {
            const nodeWithId = iter.value as NodeWithID;
            iter = generator.next();
            const { id, node } = nodeWithId;
            if (filter(node)) {
                texts.push(nodeWithId);
            }
        }
        
        return texts;
    }
}


