import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

export class ImageNodeStore extends NodeStore {

    constructor(initializer: Partial<ImageNodeStore>) {
        super();
        Object.assign(this, initializer);
    }

    @observable
    public url: string | undefined;

    @observable
    public alt: string | undefined;

}