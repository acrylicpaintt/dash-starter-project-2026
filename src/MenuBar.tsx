import React from 'react';
import './MenuBar.scss';

import  AddImageNode from './AddImageNode';
import  AddTextNode from './AddTextNode';
import  AddWebsiteNode from './AddWebsiteNode';
import  AddVideoNode from './AddVideoNode';
import { NodeCollectionStore } from './stores';

interface MenuBarProps {
    nodeCollection: NodeCollectionStore;
}

export class MenuBar extends React.Component<MenuBarProps> {
    

    render() {
        return (
            <div className="MenuBar">
              <AddTextNode nodeCollection={this.props.nodeCollection} />
              <AddImageNode nodeCollection={this.props.nodeCollection} />
              <AddVideoNode nodeCollection={this.props.nodeCollection} />
              <AddWebsiteNode nodeCollection={this.props.nodeCollection} />
              
            </div>
            
        );
    }
}


export default MenuBar;
