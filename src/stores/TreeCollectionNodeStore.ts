import { observable, action, makeObservable } from "mobx";
import { NodeStore } from "./NodeStore";

export class TreeCollectionNodeStore extends NodeStore {
    constructor(initializer: Partial<TreeCollectionNodeStore>) {
        super();
        makeObservable(this);
        Object.assign(this, initializer);
    }

    @observable
    public nodes: NodeStore[] = [];

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

    @observable
    public freeformView: boolean = false; //sets it to be freeform at default
    //false because its a treenode view

    @action
    public changeView() {
        this.freeformView = !this.freeformView; //alters it if it is freeform and vice versa
    }
}
