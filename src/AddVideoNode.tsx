import React from 'react'
import './AddNodeButton.scss';
import { NodeCollectionStore, VideoNodeStore, StoreType } from './stores';

interface AddVideoNodeProps {
    nodeCollection: NodeCollectionStore;
}

export class AddVideoNode extends React.Component<AddVideoNodeProps> {
    createNewNode = () => {
        const newNode = new VideoNodeStore({ 
            type: StoreType.Video, 
            x: Math.random() * 10000, 
            y: Math.random() * 10000, //change this if possible - maybe to where mouse is or in the center of the visible canvas
            title: "New Website Node", 
            url:  "http://cs.brown.edu/people/peichman/downloads/cted.mp4" 
            
        });
        
        this.props.nodeCollection.addNodes([newNode]);
        
    };

    render() {
        return ( 
            <button className="AddNodeButton" onClick={this.createNewNode}>Add New Video Node</button>  
            // maybe have it so there is add new node of each type, would be better   
        );
    }
}

export default AddVideoNode;