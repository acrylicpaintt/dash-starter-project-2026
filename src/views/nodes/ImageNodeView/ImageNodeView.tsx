import { observer } from "mobx-react";
import * as React from 'react';
import { ImageNodeStore, SelectionStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import { LinkedNodesBar } from "./../LinkedNodesBar";
import { ResizeHandle } from "./../ResizeHandle";
import "./ImageNodeView.scss";

interface ImageNodeProps {
    store: ImageNodeStore;
    selected: SelectionStore;
}

@observer
export class ImageNodeView extends React.Component<ImageNodeProps> {
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
        
        if (store.selected === true) {
            //if this collection node is selected, return node with a purple border around it
            return (
                <div className="node imageNode selected" onClick={changeSelect} ref={this.nodeRef} style={{ transform: store.transform }}>
                    <TopBar store={store}/>
                    <div className="scroll-box">
                        <div className="content">
                            <h3 className="title">{store.title}</h3>
                            <img src={store.url} alt=""/>
                        </div>
                    </div>
                    <div><ResizeHandle store={store} nodeRef={this.nodeRef}/></div>
                    <LinkedNodesBar store={store}/>
                </div>
            );
        }
        else {
            //if not, remove purple border
            return (
            <div className="node imageNode" onClick={changeSelect} ref={this.nodeRef} style={{ transform: store.transform }}>
                <TopBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.title}</h3>
                        <img src={store.url} alt=""/>
                    </div>
                </div>
                <div><ResizeHandle store={store} nodeRef={this.nodeRef}/></div>
                <LinkedNodesBar store={store}/>
                
            </div>
        );
        }
    }
}