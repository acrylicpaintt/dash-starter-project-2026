import React from 'react';
import { useState } from 'react';
import './App.scss';
import { NodeCollectionStore, SelectionStore, NodeStore, TextNodeStore, StoreType, VideoNodeStore, WebsiteNodeStore, ImageNodeStore, CollectionNodeStore } from './stores';
import { FreeFormCanvas } from './views/freeformcanvas/FreeFormCanvas';
import { MenuBar } from './MenuBar';

//let numNodes: number = 300;

const mainNodeCollection = new NodeCollectionStore();
const currentSelectionStore = new SelectionStore(); //keeps track of the nodes that are currently selected

export class App extends React.Component {
    render() {
        
        //count to keep track of how many nodes have been made
        //when deleting nodes, I will not reset (if you delete only one node, the other ones might have same number and be hard to interpret)
        //so that they are each identifiable
        //initialize count to be 0

        return (
            
            <div className="App">
              <FreeFormCanvas store={mainNodeCollection} selectionStore={currentSelectionStore} /> 
              <MenuBar nodeCollection={mainNodeCollection} selectionStore={currentSelectionStore} />
              
            </div>
            
        );
    }
}

export default App;