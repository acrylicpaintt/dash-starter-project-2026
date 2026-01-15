import { observable, makeObservable } from "mobx";
import { NodeStore } from "./NodeStore";

export class StaticTextNodeStore extends NodeStore {

    constructor(initializer: Partial<StaticTextNodeStore>) {
        super();
        makeObservable(this);
        Object.assign(this, initializer);
    }

    @observable
    public title: string = "";

    @observable
    public text: string = "";
}