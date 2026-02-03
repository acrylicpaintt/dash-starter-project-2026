import { observer } from "mobx-react";
import * as React from 'react';
import 'react-quill/dist/quill.snow.css';
import { VideoNodeStore, SelectionStore } from "../../../stores";
import "./VideoTextView.scss";

interface VideoTextProps {
    store: VideoNodeStore;
    selected: SelectionStore;
}

@observer
export class VideoTextView extends React.Component<VideoTextProps> {
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
                    className="node videoText selected" onClick={changeSelect}
                    ref={this.nodeRef} style={{ height: 50, width: this.props.store.width, transform: store.transform }}
                    onWheel={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                    }}>
                    <div className="content">
                        <h3 className="titleText">{this.props.store.title} [Links: {getLinks()}]</h3>
                    </div>
                    
                </div>
            );
        }
        else {
            //if not, remove purple border
            return(
                <div
                    className="node videoText" onClick={changeSelect}
                    ref={this.nodeRef} style={{ height: 50, width: this.props.store.width, transform: store.transform }}
                    onWheel={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                    }}>
                    <div className="content">
                        <h3 className="titleText">{this.props.store.title} [Links: {getLinks()}]</h3>
                    </div>
                </div>
                    
            );
        }
    }
}
