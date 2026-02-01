import { makeObservable, action, observable } from "mobx";
import { NodeStore } from "./NodeStore";

export class SelectionStore {

    constructor() {
        makeObservable(this);
    }

    @observable
    public selectedNodes: NodeStore[] = new Array<NodeStore>();
    //list of the nodes that are selected that can be referenced

    @action
    public clearAll() {
        //used when the user hits the clearAll button
        this.selectedNodes.forEach(node => (node.selected = false));
        // sets the attribute selected for each node to false
        this.selectedNodes = [];
        //empties the list of selected Nodes
    }

    @action
    public addToSelected(node: NodeStore) {
        //add a node to the selected list
        this.selectedNodes.push(node);
    }

    @action
    public removeFromSelected(node: NodeStore) {
        //removes the node
        this.selectedNodes = this.selectedNodes.filter(n => n !== node);
    }

    isSelected(node: NodeStore): boolean {
        //lets node know if they're selected
        //lets it be so that they only use selectionStore for all of it
        return this.selectedNodes.includes(node);
    }



}