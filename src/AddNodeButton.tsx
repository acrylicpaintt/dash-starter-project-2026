import React from 'react'
import './AddNodeButton.scss';
import { NodeCollectionStore, TextNodeStore, StoreType } from './stores';

interface AddNodeButtonProps {
    nodeCollection: NodeCollectionStore;
}

export class AddNodeButton extends React.Component<AddNodeButtonProps> {
    createNewNode = () => {
        const newNode = new TextNodeStore({ 
            type: StoreType.Text, 
            x: Math.random() * 10000, 
            y: Math.random() * 10000, 
            title: "New Node", 
            text: "This is a newly created node!" 
        });
        
        // Add the node to the collection
        this.props.nodeCollection.addNodes([newNode]);
        
        console.log("New node created!");
    };

    render() {
        return ( 
            <button className="AddNodeButton" onClick={this.createNewNode}>Add New Node</button>  
            // maybe have it so there is add new node of each type, would be better   
        );
    }
}

export default AddNodeButton;