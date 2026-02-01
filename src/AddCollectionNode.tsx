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
        const testNode = new NodeCollectionStore;
let nodesTest: NodeStore[] = [];
nodesTest.push(new TextNodeStore({ type: StoreType.Text, x: 0, y: 0, title: "Teste", text: "TEST"}))
testNode.addNodes(nodesTest);
        const newNode = new CollectionNodeStore({
            type: StoreType.Collection,
            x: window.innerWidth / 2 - this.props.nodeCollection.x - 700, 
            y: window.innerWidth / 2 - this.props.nodeCollection.y - 600,
            title: "Collection Node",
            nodes: [new TextNodeStore({ type: StoreType.Text, x: 0, y: 0, title: "Teste", text: "TEST"})],
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
