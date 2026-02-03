import { observer } from "mobx-react";
import * as React from "react";
import { TreeCollectionNodeStore, SelectionStore } from "../../../stores";
import { TreeCanvas } from "../../treecanvas/TreeCanvas";
import "./TreeCollectionTextView.scss";

interface TreeCollectionTextProps {
    store: TreeCollectionNodeStore;
    selected: SelectionStore;
}

@observer
export class TreeCollectionTextView extends React.Component<TreeCollectionTextProps> {
    private nodeRef = React.createRef<HTMLDivElement>();

    render() {
         let store = this.props.store;
         let selected = this.props.selected;

        function changeSelect(e: React.MouseEvent) {
            //alters the selection state of the node
            e.stopPropagation();
            e.preventDefault();
            store.setSelected(!store.selected);
            //if it is already selected, deselects it
            //vice versa
            if (store.selected) {
                selected.addToSelected(store);
            }
            else{
                selected.removeFromSelected(store);
            }
        }

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
        //fix this
        let height = store.height;

        if (store.parent) {
            height = store.parent.height;
        }

        let width = store.width;

        if (store.parent) {
            width = store.parent.width;
        }

            if (store.selected === true) {
                //if this collection node is selected, return node with a purple border around it
                return (
                <div
                    className="node collectionTreeText selected" onClick={changeSelect} //onClick so if anywhere on the node is clicked, will be selectd/deselected
                    ref={this.nodeRef}
                    style={{
                        transform: store.transform,
                        width: width,
                        height: height,
                        
                    }}>
                    <div className="scroll-box">
                        <div className="content">
                            <h3 className="title">{this.props.store.title} [Links: {getLinks()}]</h3>
                            <TreeCanvas store={store} selectionStore={this.props.selected}/>
                        </div>
                    </div>
                </div>
                );
            } else {
                //if not, remove purple border
                return (
                <div
                    className="node collectionTreeText" //onClick so if anywhere on the node is clicked, will be selectd/deselected
                    onClick={changeSelect}
                    ref={this.nodeRef}
                    style={{
                        transform: store.transform,
                        width: width,
                        height: height, //FIX
                        
                    }}>
                    <div className="scroll-box">
                        <div  className="content">
                            <h3 className="title">{this.props.store.title} [Links: {getLinks()}]</h3>
                            <TreeCanvas store={store} selectionStore={this.props.selected}/>
                        </div>
                    </div>
                    </div>

                );
            }
            
    }
}
