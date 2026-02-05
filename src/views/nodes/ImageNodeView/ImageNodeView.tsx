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
        
        if (store.selected === true) {
            //if this collection node is selected, return node with a purple border around it
            return (
                <div style={{ transform: store.transform }}>
            <div className="node imageNode selected" 
            ref={this.nodeRef} >
                <TopBar store={store} selected={selected}/>
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.title}</h3>
                        <img src={store.url} alt=""/>
                    </div>
                </div>
                <div><ResizeHandle store={store} nodeRef={this.nodeRef}/></div>
                
                
            </div>
            <div style={{
                position: 'absolute',
                top: '100%', 
                left: 0,
                width: '100%',
            }}> <LinkedNodesBar store={store}/></div>
            </div>
                
            );
        }
        else {
            //if not, remove purple border
            return (
            <div style={{ transform: store.transform}}>
                <div className="node imageNode" 
                ref={this.nodeRef} >
                    <TopBar store={store} selected={selected}/>
                    <div className="scroll-box">
                        <div className="content">
                            <h3 className="title">{store.title}</h3>
                            <img src={store.url} alt=""/>
                        </div>
                    </div>
                    <div><ResizeHandle store={store} nodeRef={this.nodeRef}/></div>
                    
                </div>
                <div style={{
                            position: 'absolute',
                            top: '100%', 
                            left: 0,
                            width: '100%',
                        }}> <LinkedNodesBar store={store}/></div>
            
            </div>
        );
        }
    }
}