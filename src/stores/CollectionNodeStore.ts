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
    public canvas: FreeFormCanvas | undefined;

    @observable
    public title: string | undefined;

    @action
    public addNodes(stores: NodeStore[]): void {
        this.nodes.push(...stores);
    }
}
