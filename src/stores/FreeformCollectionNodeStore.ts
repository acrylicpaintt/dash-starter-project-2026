import { observable, action, makeObservable } from "mobx";
import { NodeStore } from "./NodeStore";
import { FreeFormCanvas } from "../views/freeformcanvas/FreeFormCanvas";

export class FreeformCollectionNodeStore extends NodeStore {
    constructor(initializer: Partial<FreeformCollectionNodeStore> = {}) {
        super();
        makeObservable(this);
        Object.assign(this, initializer);

    }

    @observable
    public nodes: NodeStore[] = [];

    @observable
    public canvas: FreeFormCanvas | undefined; //the canvas should be unchanged so yeah

    @action
    public addNodes(stores: NodeStore[]): void {
        stores.forEach(node => {
            node.parent = this; // set this collection as the parent node
        });
        this.nodes.push(...stores); // This is equivalent to: stores.forEach(store => this.nodes.push(store));

    }
    //very similar to nodecollectionsotre

    @action
    public removeNode(node: NodeStore): void {
        //helper function to remove nodes
        this.nodes = this.nodes.filter(n => n !== node);

    }
}
