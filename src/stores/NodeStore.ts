import { computed, action, observable, makeObservable } from "mobx";
import { Utils } from "../Utils";

export enum StoreType {
    Text, 
    Image,
    Video,
    Website,
    Collection,
}

export class NodeStore {

    public Id: string = Utils.GenerateGuid();

    public type: StoreType | null = null;

    @observable
    public x: number = 0;

    @observable
    public y: number = 0;

    @observable
    public width: number = 300;

    @observable
    public linkedNodes: NodeStore[] = new Array<NodeStore>();

    @observable
    public height: number = 300;
    //set to be 300 and 300 so that it is defaultly created at a visible size, not at 0 and 0

    @observable
    public selected: boolean = false;
    //states whether or not the current node is selected or not

    @action
    public setSelected(selected: boolean) {
        this.selected = selected;
    }
    //function to alter the state of whether or not a node is selected or not

    @action
    public addLink(node: NodeStore) {
        this.linkedNodes.push(node);
    }

    constructor() {
        makeObservable(this);
    }

    @computed
    public get transform(): string {
        return "translate(" + this.x + "px, " + this.y + "px)";
    }
}