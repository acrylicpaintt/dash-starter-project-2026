import React from 'react';
import './MenuBar.scss';
import { observer } from 'mobx-react';

import { TreeCollectionNodeStore, FreeformCollectionNodeStore, SelectionStore, NodeCollectionStore, VideoNodeStore,
    TextNodeStore, ImageNodeStore, WebsiteNodeStore, StoreType, NodeStore} from './stores';
import { FreeFormCanvas } from './views/freeformcanvas/FreeFormCanvas';
import { FreeformCollectionTextView } from './views/nodes';

interface MenuBarProps {
    nodeCollection: NodeCollectionStore;
    selectionStore: SelectionStore;
}

@observer
export class MenuBar extends React.Component<MenuBarProps> {

    //all buttons are in menubar instead of individual areas so that I can navigate which collection is selected and delete 
    //across multiple selections/areas better

    state = {
        currentCollection: this.props.nodeCollection, //which collection to add nodes to
        count: 0, //counts how many nodes have been here
        //does not delete node so that there is no confusion when nodes are deleted
        errorMessage: "",
    };

    linkTwo = () => {
        //links two nodes together, adds them to each others list of linked nodes
        //TASK: MAKE SRUE YOU KNOW HOW TO DISPLAY THESE

        if (this.props.selectionStore.selectedNodes.length !== 2 ) {
            this.setState({errorMessage: "Error: please select 2 nodes"});
            //check that you only selected two
            return;
        }

        const nodeOne = this.props.selectionStore.selectedNodes[0];
        const nodeTwo = this.props.selectionStore.selectedNodes[1];

        if (nodeOne.parent !== nodeTwo.parent) {
            //not in the same canvas
            this.setState({errorMessage: "Error: please select 2 nodes in the same collection"});
            return;
        }

        nodeOne.addLink(nodeTwo);
        nodeTwo.addLink(nodeOne);
        this.setState({errorMessage: ""});
        return;

    }

    unlinkTwo = () => {
        //unlinks two nodes , removes them from each others list of linked nodes
        
        if (this.props.selectionStore.selectedNodes.length !== 2 ) {
            this.setState({errorMessage: "Error: please select 2 nodes"});
            //check that you only selected two
            return;
        }

        const nodeOne = this.props.selectionStore.selectedNodes[0];
        const nodeTwo = this.props.selectionStore.selectedNodes[1];

        if (nodeOne.parent !== nodeTwo.parent) {
            //not in the same canvas
            this.setState({errorMessage: "Error: please select 2 that are in the same collection"});
            return;
        }

        nodeOne.removeLink(nodeTwo);
        nodeTwo.removeLink(nodeOne);
        this.setState({errorMessage: ""});
        return;

    }

    setCurrentCollection = () => {
        //update the collection to know where to add to
        //ex. set to collection node instead of the main collection canvas
        const { selectionStore } = this.props;

        if (selectionStore.selectedNodes.length !== 1 ) {
            //check that you only selected one
            this.setState({errorMessage: "Error: More than one collection/node selected"});
            return;
        }

        const collection = this.props.selectionStore.selectedNodes[0];

        if (!(collection instanceof FreeformCollectionNodeStore || collection instanceof TreeCollectionNodeStore)) {
        //check the type
            this.setState({errorMessage: "Error: Not a collection"});
            return;
        }
        this.setState({ errorMessage: "", currentCollection: collection });
    }

    setCollectionMain = () => {
        //resets it so the collection is the main canvas
        //aka when the user adds nodes, they will add to freeform canvas now
        const { nodeCollection } = this.props;
        this.setState({ currentCollection: nodeCollection });
        
    }

    deleteNode = () => {
        // for each node in selection node, deletes them        
        this.props.selectionStore.selectedNodes.forEach(node => {
            //checks each node selected
    
            // reset to main collection if the current collection gets deleted
            if (node === this.state.currentCollection) {
                this.setState({ currentCollection: this.props.nodeCollection });
            }

            if (node.parent !== null) {
                //if it has a parent 
                node.parent.removeNode(node);
                //ensures ALL selected nodes are deleted
            }

            for (let ind = 0; ind < node.linkedNodes.length; ind ++ ) {
                //removes its linked nodes
                node.linkedNodes[ind].removeLink(node);
            }
        });
        
        // Clear selection after deleting
    this.props.selectionStore.clearAll();
}

    deselectAll = () => {
        let selectionStore = this.props.selectionStore;
        selectionStore.clearAll();
    }

    createNewTextNode = () => {
        //adds new text node to the collection
        const newTextNode = new TextNodeStore({ 
            type: StoreType.Text, 
            x: window.innerWidth / 2 - this.state.currentCollection.x - 600 , 
            y: window.innerHeight / 2 - this.state.currentCollection.y - 200,
            title: "Text Node #" + this.state.count.toString(), //title: type of node + how many nodes there are
            text: "" 
        });

        this.state.currentCollection.addNodes([newTextNode]); //adds to the current collection
        
        this.setState({count: this.state.count + 1}); //updates count to add a node
    }

    createNewImageNode = () => {
        //adds new image node to the collection
        const newImageNode = new ImageNodeStore({ 
            type: StoreType.Image, 
            x: window.innerWidth / 2 - this.state.currentCollection.x - 600 , 
            y: window.innerHeight / 2 - this.state.currentCollection.y - 200,
            title: "Image Node #" + this.state.count.toString(),  //title: type of node + how many nodes there are
            url: "data:image/jpeg;base64,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"
        });
        
        this.state.currentCollection.addNodes([newImageNode]); //adds to the current collection

        this.setState({count: this.state.count + 1}); //updates count to add a node
    };

    createNewFreeFormCollectionNode = () => {
         //adds new collection node to the collection
        let emptyNodeStore: NodeStore[] = [];
        const newNode = new FreeformCollectionNodeStore({
            type: StoreType.CollectionFreeform,
            x: window.innerWidth / 2 - this.state.currentCollection.x - 600 , 
            y: window.innerHeight / 2 - this.state.currentCollection.y - 200,
            title: "Freeform Collection Node #"+ this.state.count.toString(),  //title: type of node + how many nodes there are
            nodes: emptyNodeStore,
        });

        this.state.currentCollection.addNodes([newNode]); //adds to the current collection

        this.setState({count: this.state.count + 1}); //updates count to add a node
    };

    createNewWebsiteNode = () => {
        //adds new website node to the collection
        const newNode = new WebsiteNodeStore({ 
            type: StoreType.Website, 
            x: window.innerWidth / 2 - this.state.currentCollection.x - 600 , 
            y: window.innerHeight / 2 - this.state.currentCollection.y - 200,
            title: "Website Node #" + this.state.count.toString(),  //title: type of node + how many nodes there are
            url:  "https://brown-dash.github.io/Dash-Documentation/about/" 
            
        });
        
        this.state.currentCollection.addNodes([newNode]); //adds to the current collection

        this.setState({count: this.state.count + 1}); //updates count to add a node
        
    };

    createNewVideoNode = () => {
        //adds new website node to the collection
        const newNode = new VideoNodeStore({ 
            type: StoreType.Video, 
            x: window.innerWidth / 2 - this.state.currentCollection.x - 600 , 
            y: window.innerHeight / 2 - this.state.currentCollection.y - 200,
            title: "Video Node #" + this.state.count.toString(),  //title: type of node + how many nodes there are
            url:  "http://cs.brown.edu/people/peichman/downloads/cted.mp4" 
            
        });
        
        this.state.currentCollection.addNodes([newNode]); //adds to the current collection

        this.setState({count: this.state.count + 1}); //updates count to add a node
        
    };

    createNewTreeCollectionNode = () => {
        //adds new tree collection node to the collection
        let emptyNodeStore: NodeStore[] = [];
        const newTreeNode = new TreeCollectionNodeStore({ 
            type: StoreType.CollectionTree, 
            x: window.innerWidth / 2 - this.state.currentCollection.x - 600 , 
            y: window.innerHeight / 2 - this.state.currentCollection.y - 200,
            title: "Tree Collection Node #" + this.state.count.toString(),  //title: type of node + how many nodes there are            
            nodes: emptyNodeStore,
        });
        
        this.state.currentCollection.addNodes([newTreeNode]); //adds to the current collection

        this.setState({count: this.state.count + 1}); //updates count to add a node
        
    };

    switchView = () => {
        this.props.nodeCollection.changeView();
    }

    
    render() {

        return (
            <div className="MenuBar">
                <button className="menuButton" onClick={this.createNewTextNode}>+ Text Node</button>
                <button className="menuButton" onClick={this.createNewImageNode}>+ Image Node</button>
                <button className="menuButton" onClick={this.createNewVideoNode}>+ Video Node</button>
                <button className="menuButton" onClick={this.createNewWebsiteNode}>+ Website Node</button>
                <button className="menuButton" onClick={this.createNewFreeFormCollectionNode}>+ Free Collection</button>
                <button className="menuButton" onClick={this.createNewTreeCollectionNode}>+ Tree Collection</button>
                <button className="menuButton" onClick={this.setCurrentCollection}>Set Collection</button>
                <button className="menuButton" onClick={this.linkTwo}>Link Two</button>
                <button className="menuButton" onClick={this.unlinkTwo}>Unlink Two</button>
                <button className="menuButton" onClick={this.deleteNode}>Delete Selected</button>
                <button className="menuButton" onClick={this.setCollectionMain}>Collection: Main</button>
                <button className="menuButton" onClick={this.switchView}>Switch View</button>
                <button className="menuButton" onClick={this.deselectAll}>Deselect All</button>
                <h3 className="error">{this.state.errorMessage}</h3>
            </div>
            
        );
    }
}

export default MenuBar;
