import { makeObservable, override, observable, action } from "mobx";
import { NodeStore } from "./NodeStore";

export class NodeCollectionStore extends NodeStore {

    @observable
    public nodes: NodeStore[] = new Array<NodeStore>();

    constructor() {
        super();
        makeObservable(this);

    }

    @observable
    public freeformView: boolean = true; //sets it to be freeform at default

    @action
    public changeView() {
        this.freeformView = !this.freeformView; //alters it if it is freeform and vice versa
    }

    @override
    public get transform(): string {
        return "translate(" + this.x + "px," + this.y + "px)"; // for CSS trnsform property
    }

    @action
    public addNodes(stores: NodeStore[]): void {
        stores.forEach(node => {
            node.parent = this; // set this collection as the parent node
        });
        this.nodes.push(...stores); // This is equivalent to: stores.forEach(store => this.nodes.push(store));

    }

    @action
    public removeNode(node: NodeStore): void {
        //helper function to remove nodes
        this.nodes = this.nodes.filter(n => n !== node);

    }

}