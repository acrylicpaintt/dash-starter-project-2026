import { observer } from "mobx-react";
import * as React from "react";
import { TreeCollectionNodeStore, SelectionStore } from "../../../stores";
import { TopBar } from "../TopBar";
import { ResizeHandle } from "../ResizeHandle";
import { TreeCanvas } from "../../treecanvas/TreeCanvas";
import "./TreeCollectionNodeView.scss";
import { LinkedNodesBar } from "../LinkedNodesBar";
import "./../NodeView.scss";

interface TreeCollectionNodeProps {
    store: TreeCollectionNodeStore;
    selected: SelectionStore;
}

@observer
export class TreeCollectionNodeView extends React.Component<TreeCollectionNodeProps> {
    private nodeRef = React.createRef<HTMLDivElement>();

    render() {
         let store = this.props.store;
         let selected = this.props.selected;

        function getLinks(): string {
            //returns all of the linked nodes as a list to be printed out
            if (store.linkedNodes.length === 0) {
                return "";
            } else {
                let toReturn = "";
                for (let index = 0; index < store.linkedNodes.length; index++ ) {
                    toReturn += store.linkedNodes[index].title + ", ";
                }
                return toReturn.substring(0,toReturn.length-2);
            }            
        }


            if (store.selected === true) {
                //if this collection node is selected, return node with a purple border around it
                return (
                <div style={{
                        transform: store.transform}} >
                <div
                    className="node collectionTreeNode selected"
                    ref={this.nodeRef}
                    style={{width: store.width, height: store.height}}>
                    <TopBar store={store} selected={selected}/>
                    <div className="scroll-box">
                        <div  className="content">
                            <h3 className="title">{this.props.store.title} [Links: {getLinks()}]</h3>
                            <TreeCanvas store={store} selectionStore={this.props.selected}/>
                        </div>
                        <ResizeHandle store={store} nodeRef={this.nodeRef} />
                    </div>
                    </div>
                    <div style={{ position: 'absolute', top: '100%',  left: 0, width: '100%' }}>
                        <LinkedNodesBar store={store}/></div>
                    </div>
                );
            } else {
                //if not, remove purple border
                return (
                    <div style={{
                        transform: store.transform}}>
                <div
                    className="node collectionTreeNode"
                    ref={this.nodeRef}
                    style={{width: store.width, height: store.height}}>
                    <TopBar store={store} selected={selected}/>
                    <div className="scroll-box">
                        <div  className="content">
                            <h3 className="title">{this.props.store.title} [Links: {getLinks()}]</h3>
                            <TreeCanvas store={store} selectionStore={this.props.selected}/>
                        </div>
                        <ResizeHandle store={store} nodeRef={this.nodeRef} />
                    </div>
                    </div>
                    <div style={{ position: 'absolute', top: '100%',  left: 0, width: '100%' }}>
                        <LinkedNodesBar store={store}/></div>
                    </div>

                );
            }
            
    }
}
