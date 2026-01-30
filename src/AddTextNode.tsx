import React from 'react'
import './AddNodeButton.scss';
import { NodeCollectionStore, TextNodeStore, StoreType } from './stores';

interface AddTextNodeProps {
    nodeCollection: NodeCollectionStore;
}

export class AddTextNode extends React.Component<AddTextNodeProps> {
    createNewNode = () => {
        const newNode = new TextNodeStore({ 
            type: StoreType.Text, 
            x: Math.random() * 10000, 
            y: Math.random() * 10000, //change this if possible - maybe to where mouse is or in the center of the visible canvas
            title: "New Node", 
            text: "This is a newly created node!" 
        });
        
        this.props.nodeCollection.addNodes([newNode]);
        
    };

    render() {
        return ( 
            <button className="AddNodeButton" onClick={this.createNewNode}>Add New Text Node</button>  
            // maybe have it so there is add new node of each type, would be better   
        );
    }
}

export default AddTextNode;