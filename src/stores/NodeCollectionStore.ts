import { makeObservable, override, observable, action } from "mobx";
import { NodeStore } from "./NodeStore";

export class NodeCollectionStore extends NodeStore {

    @observable
    public nodes: NodeStore[] = new Array<NodeStore>();

    constructor() {
        super();
        makeObservable(this);
    }

    @override
    public get transform(): string {
        return "translate(" + this.x + "px," + this.y + "px)"; // for CSS trnsform property
    }

    @action
    public addNodes(stores: NodeStore[]): void {
        this.nodes.push(...stores); // This is equivalent to: stores.forEach(store => this.nodes.push(store));

    }

    @action
    public removeNode(node: NodeStore): void {
        //helper function to remove nodes
        this.nodes = this.nodes.filter(n => n !== node);

    }
}