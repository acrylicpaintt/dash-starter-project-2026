import React from 'react'
import './AddNodeButton.scss';
import { NodeCollectionStore, WebsiteNodeStore, StoreType } from './stores';

interface AddWebsiteNodeProps {
    nodeCollection: NodeCollectionStore;
}

export class AddWebsiteNode extends React.Component<AddWebsiteNodeProps> {
    createNewNode = () => {
        const newNode = new WebsiteNodeStore({ 
            type: StoreType.Video, 
            x: Math.random() * 10000, 
            y: Math.random() * 10000, //change this if possible - maybe to where mouse is or in the center of the visible canvas
            title: "New Website Node", 
            url:  "http://google.com" 
            
        });
        
        this.props.nodeCollection.addNodes([newNode]);
        
    };

    render() {
        return ( 
            <button className="AddNodeButton" onClick={this.createNewNode}>Add New Website Node</button>  
            // maybe have it so there is add new node of each type, would be better   
        );
    }
}

export default AddWebsiteNode;