import React from "react";
import { CollectionNodeStore, NodeCollectionStore, StoreType } from "./stores";
import "./AddNodeButton.scss";
import { NodeStore
 } from "./stores";
 import { TextNodeStore } from "./stores";

interface AddCollectionNodeProps {
    nodeCollection: NodeCollectionStore;
}

export class AddCollectionNode extends React.Component<AddCollectionNodeProps> {
    createNewNode = () => {
        let emptyNodeStore: NodeStore[] = [];
        const newNode = new CollectionNodeStore({
            type: StoreType.Collection,
            x: window.innerWidth / 2 - this.props.nodeCollection.x - 700, 
            y: window.innerWidth / 2 - this.props.nodeCollection.y - 600,
            title: "Collection Node",
            nodes: emptyNodeStore,
        });

        this.props.nodeCollection.addNodes([newNode]);
    };

    render() {

        return (
            
            <button className="AddNodeButton" onClick={this.createNewNode}>
                + Collection Node
            </button>
        );
    }
}

export default AddCollectionNode;
