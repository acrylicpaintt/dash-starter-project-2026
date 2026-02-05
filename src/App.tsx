import React from 'react';
import './App.scss';
import { NodeCollectionStore, SelectionStore} from './stores';
import { FreeFormCanvas } from './views/freeformcanvas/FreeFormCanvas';
import { MenuBar } from './MenuBar';

const mainNodeCollection = new NodeCollectionStore();
const currentSelectionStore = new SelectionStore(); //keeps track of the nodes that are currently selected

export class App extends React.Component {
    render() {
        return (
            <div className="App">
                 <MenuBar nodeCollection={mainNodeCollection} selectionStore={currentSelectionStore}/>
                 <div className="scroll-box"> 
                 <FreeFormCanvas store={mainNodeCollection} selectionStore={currentSelectionStore} />                  
                </div>
            </div>
        );
    
    }
}

export default App;