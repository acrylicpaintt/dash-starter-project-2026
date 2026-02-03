import React from 'react';
import './App.scss';
import { NodeCollectionStore, SelectionStore, TreeCollectionNodeStore, NodeStore, TextNodeStore, StoreType, VideoNodeStore, WebsiteNodeStore, ImageNodeStore, FreeformCollectionNodeStore } from './stores';
import { FreeFormCanvas } from './views/freeformcanvas/FreeFormCanvas';
import { MenuBar } from './MenuBar';

const mainNodeCollection = new NodeCollectionStore();
const currentSelectionStore = new SelectionStore(); //keeps track of the nodes that are currently selected

export class App extends React.Component {
    render() {
        
        return (
            
            <div className="App">
              <FreeFormCanvas store={mainNodeCollection} selectionStore={currentSelectionStore} /> 
              <MenuBar nodeCollection={mainNodeCollection} selectionStore={currentSelectionStore} />
              
            </div>
            
        );
    }
}

export default App;