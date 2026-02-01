import React from 'react';
import './MenuBar.scss';

import  AddImageNode from './AddImageNode';
import  AddTextNode from './AddTextNode';
import  AddWebsiteNode from './AddWebsiteNode';
import  AddVideoNode from './AddVideoNode';
import  AddCollectionNode from './AddCollectionNode';

import { CollectionNodeStore, SelectionStore, NodeCollectionStore } from './stores';

interface MenuBarProps {
    nodeCollection: NodeCollectionStore;
    selectionStore: SelectionStore;
}

export class MenuBar extends React.Component<MenuBarProps> {

    state = {
        currentCollection: this.props.nodeCollection,
    };

    linkTwo = () => {
        //links two nodes together, adds them to each others list of linked nodes
        //TASK: MAKE SRUE YOU KNOW HOW TO DISPLAY THESE
        console.log('hi');
        const { selectionStore, nodeCollection } = this.props;

        if (selectionStore.selectedNodes.length !== 2 ) {
            console.log('not 2 nodes');
            //check that you only selected two
            return;
        }

        const nodeOne = this.props.selectionStore.selectedNodes[0];
        const nodeTwo = this.props.selectionStore.selectedNodes[0];

        nodeOne.addLink(nodeTwo);
        nodeTwo.addLink(nodeOne);

        console.log(nodeOne.linkedNodes);

        return;

    }

    setCurrentCollection = () => {
        //update the collection to know where to add to
        //ex. set to collection node instead of the main collection canvas
        const { selectionStore } = this.props;

        if (selectionStore.selectedNodes.length !== 1 ) {
            //check that you only selected one
            console.error("error: more than one thing selected");
            return;
        }

        const collection = this.props.selectionStore.selectedNodes[0];

        if (!(collection instanceof CollectionNodeStore)) {
        //check the type
            console.error("error: not a collection");
            return;
        }
        this.setState({ currentCollection: collection });
    }

    setCollectionMain = () => {
        //resets it so the collection is the main canvas
        //aka when the user adds nodes, they will add to freeform canvas now
        const { selectionStore, nodeCollection } = this.props;
        this.setState({ currentCollection: nodeCollection });
    }

    deleteNode = () => {
        let selectedNodes = this.props.selectionStore.selectedNodes;
        for (var index in selectedNodes) {
            //for all selected Nodes
            //reminder -> check on collections ..?????
            this.props.selectionStore.removeFromSelected(selectedNodes[index]);
            //i think I need this so it doenst hold on this these nodes when they're gone
            this.props.nodeCollection.removeNode(selectedNodes[index]);

        }
    }

    render() {
        const { currentCollection } = this.state;
        return (
            <div className="MenuBar">
              <AddTextNode nodeCollection={currentCollection} />
              <AddImageNode nodeCollection={currentCollection} />
              <AddVideoNode nodeCollection={currentCollection} />
              <AddWebsiteNode nodeCollection={currentCollection} />
              <AddCollectionNode nodeCollection={currentCollection} />
              <button className="AddNodeButton" onClick={this.setCurrentCollection}>Set Collection</button>
              <button className="AddNodeButton" onClick={this.linkTwo}>Link</button>
              <button className="AddNodeButton" onClick={this.deleteNode}>Delete Selected</button>
              <button className="AddNodeButton" onClick={this.setCollectionMain}>Collection: Main</button>
              <button className="AddNodeButton">Tree View</button>
              <button className="AddNodeButton">Main View</button>
            </div>
            
        );
    }
}

export default MenuBar;
