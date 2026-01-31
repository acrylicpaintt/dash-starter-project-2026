import React from 'react'
import './AddNodeButton.scss';
import { NodeCollectionStore, WebsiteNodeStore, StoreType } from './stores';

interface AddWebsiteNodeProps {
    nodeCollection: NodeCollectionStore;
}

export class AddWebsiteNode extends React.Component<AddWebsiteNodeProps> {
    createNewNode = () => {
        const newNode = new WebsiteNodeStore({ 
            type: StoreType.Website, 
            x: window.innerWidth / 2 - this.props.nodeCollection.x - 700, 
            y: window.innerWidth / 2 - this.props.nodeCollection.y - 600 ,
            title: "New Website Node", 
            url:  "https://brown-dash.github.io/Dash-Documentation/about/" 
            
        });
        
        this.props.nodeCollection.addNodes([newNode]);
        
    };

    render() {
        return ( 
            <button className="AddNodeButton" onClick={this.createNewNode}>New Website Node</button>  
            // maybe have it so there is add new node of each type, would be better   
        );
    }
}

export default AddWebsiteNode;