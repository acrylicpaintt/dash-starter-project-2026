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
    public height: number = 300;

    @observable
    public selected: boolean = false;

    @action
    public setSelected(selected: boolean) {
        this.selected = selected;
    }

    constructor() {
        makeObservable(this);
    }

    @computed
    public get transform(): string {
        return "translate(" + this.x + "px, " + this.y + "px)";
    }
}