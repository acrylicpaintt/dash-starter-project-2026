import { observer } from "mobx-react";
import * as React from 'react';
import 'react-quill/dist/quill.snow.css';
import { ImageNodeStore, SelectionStore } from "../../../stores";
import "./ImageTextView.scss";

interface ImageTextProps {
    store: ImageNodeStore;
    selected: SelectionStore;
}

@observer
export class ImageTextView extends React.Component<ImageTextProps> {
    private nodeRef = React.createRef<HTMLDivElement>();

    render() {
        
        let store = this.props.store;
        let selected = this.props.selected
        
        function changeSelect(e: React.MouseEvent) {
            //alters the selection state of the node
            e.stopPropagation();
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

        if (store.selected === true) {
            //if this collection node is selected, return node with a purple border around it
            return (
                <div
                    className="node imageText selected" onClick={changeSelect}
                    ref={this.nodeRef}>
                    <div className="content">
                        <h3 className="titleImage">{this.props.store.title} [Links: {getLinks()}]</h3>
                    </div>
                    
                </div>
            );
        }
        else {
            //if not, remove purple border
            return(
                <div
                    className="node imageText" onClick={changeSelect}
                    ref={this.nodeRef}>
                    <div className="content">
                        <h3 className="titleImage">{this.props.store.title} [Links: {getLinks()}]</h3>
                    </div>
                </div>
                    
            );
        }
    }
}
