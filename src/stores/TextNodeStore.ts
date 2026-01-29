import { observable, makeObservable } from "mobx";
import { NodeStore } from "./NodeStore";

export class TextNodeStore extends NodeStore {

    constructor(initializer: Partial<TextNodeStore>) {
        super();
        makeObservable(this);
        Object.assign(this, initializer);
    }

    @observable
    public title: string = "";

    @observable
    public text: string = "";
}