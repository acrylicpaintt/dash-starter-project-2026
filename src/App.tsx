import React from 'react';
import './App.scss';
import { NodeCollectionStore, SelectionStore, TreeCollectionNodeStore, NodeStore, TextNodeStore, StoreType, VideoNodeStore, WebsiteNodeStore, ImageNodeStore, FreeformCollectionNodeStore } from './stores';
import { FreeFormCanvas } from './views/freeformcanvas/FreeFormCanvas';
import { TreeCanvas } from './views/treecanvas/TreeCanvas';
import { MenuBar } from './MenuBar';

const mainNodeCollection = new NodeCollectionStore();
const currentSelectionStore = new SelectionStore(); //keeps track of the nodes that are currently selected

export class App extends React.Component {
    render() {
        return (
            <div className="App">
                 <MenuBar nodeCollection={mainNodeCollection} selectionStore={currentSelectionStore}/>
                 <FreeFormCanvas store={mainNodeCollection} selectionStore={currentSelectionStore} /> 
               
            </div>
        );
    
    }
}

export default App;