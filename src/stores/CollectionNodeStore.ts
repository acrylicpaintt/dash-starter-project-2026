import { observable, action, makeObservable } from "mobx";
import { NodeStore } from "./NodeStore";
import { FreeFormCanvas } from "../views/freeformcanvas/FreeFormCanvas";

export class CollectionNodeStore extends NodeStore {
    constructor(initializer: Partial<CollectionNodeStore> = {}) {
        super();
        makeObservable(this);
        Object.assign(this, initializer);

    }

    @observable
    public nodes: NodeStore[] = [];

    @observable
    public canvas: FreeFormCanvas | undefined; //the canvas should be unchanged so yeah

    @observable
    public title: string | undefined;

    @action
    public addNodes(stores: NodeStore[]): void {
        this.nodes.push(...stores);
    }
    //very similar to nodecollectionsotre

    @action
    public removeNode(node: NodeStore): void {
        //helper function to remove nodes
        this.nodes = this.nodes.filter(n => n !== node);

    }
}
