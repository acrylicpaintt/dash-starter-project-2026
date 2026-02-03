import { observable, makeObservable } from "mobx";
import { NodeStore } from "./NodeStore";

export class TextNodeStore extends NodeStore {

    @observable
    public text: string = "";

    constructor(initializer: Partial<TextNodeStore>) {
        super();
        
        Object.assign(this, initializer);
        
    }

}