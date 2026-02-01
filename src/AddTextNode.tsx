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
            x: window.innerWidth / 2 - this.props.nodeCollection.x - 700, 
            y: window.innerWidth / 2 - this.props.nodeCollection.y - 600 ,
            title: "New Node", 
            text: "This is a newly created node!" 
        });
        
        this.props.nodeCollection.addNodes([newNode]);
        
    };

    render() {
        return ( 
            <button className="AddNodeButton" onClick={this.createNewNode}>+ Text Node</button>  
            // maybe have it so there is add new node of each type, would be better   
        );
    }
}

export default AddTextNode;