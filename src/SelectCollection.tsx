import React from 'react'
import './AddNodeButton.scss';
import { NodeCollectionStore } from './stores';

interface SelectCollectionProps {
    nodeCollection: NodeCollectionStore;
}

export class SelectCollection extends React.Component<SelectCollectionProps> {
    

    render() {
        return ( 
            <button className="AddNodeButton">Set Collection</button>  
            //purpose : set the selected collection as the place to add nodes
        );
    }
}

export default SelectCollection;