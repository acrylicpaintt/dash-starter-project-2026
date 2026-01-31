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
            x: window.innerWidth / 2 - this.props.nodeCollection.x - 700, 
            y: window.innerWidth / 2 - this.props.nodeCollection.y - 600,
            title: "New Video Node", 
            url:  "http://cs.brown.edu/people/peichman/downloads/cted.mp4" 
            
        });
        
        this.props.nodeCollection.addNodes([newNode]);
        
    };

    render() {
        return ( 
            <button className="AddNodeButton" onClick={this.createNewNode}>New Video Node</button>  
            // maybe have it so there is add new node of each type, would be better   
        );
    }
}

export default AddVideoNode;