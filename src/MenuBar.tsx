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
        currentCollection: this.props.nodeCollection
    };

    linkTwo = () => {
        const { selectionStore, nodeCollection } = this.props;

        if (selectionStore.selectedNodes.length !== 2 ) {
            //check that you only selected two
            return;
        }

        const nodeOne = this.props.selectionStore.selectedNodes[0];
        const nodeTwo = this.props.selectionStore.selectedNodes[0];

    }

    setCurrentCollection = () => {
        
        //update the collection to know where to add to
        const { selectionStore, nodeCollection } = this.props;

        if (selectionStore.selectedNodes.length !== 1 ) {
            //check that you only selected one
            return;
        }

        const collection = this.props.selectionStore.selectedNodes[0];

        if (!(collection instanceof CollectionNodeStore)) {
        //check the type
            return;
        }

        this.setState({ currentCollection: collection });
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
            </div>
            
        );
    }
}

export default MenuBar;
