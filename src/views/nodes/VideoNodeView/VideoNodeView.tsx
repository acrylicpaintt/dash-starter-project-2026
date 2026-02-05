import { observer } from "mobx-react";
import * as React from 'react';
import { VideoNodeStore, SelectionStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import { ResizeHandle } from "./../ResizeHandle";
import "./VideoNodeView.scss";
import { LinkedNodesBar } from "../LinkedNodesBar";

interface VideoNodeProps {
    store: VideoNodeStore;
    selected: SelectionStore;
}

@observer
export class VideoNodeView extends React.Component<VideoNodeProps> {
    private nodeRef = React.createRef<HTMLDivElement>();

    render() {
        let store = this.props.store;
        let selected = this.props.selected
        
        if (store.selected === true) {
            //if this collection node is selected, return node with a purple border around it
            return (
                <div style={{transform: store.transform}}>
                <div className="node videoNode selected" 
                ref={this.nodeRef}>
                    <TopBar store={store} selected={selected}/>
                    <div className="scroll-box">
                        <div className="content">
                            <h3 className="title">{store.title}</h3>
                            <video src={store.url} controls />
                        </div>
                    </div>
                    <div><ResizeHandle store={store} nodeRef={this.nodeRef}/></div>
                </div>
                <div style={{ position: 'absolute', top: '100%',  left: 0, width: '100%' }}>
                    <LinkedNodesBar store={store}/></div>
                </div>
            );
        }
        else {
            //if not, remove purple border
            return (
                <div style={{transform: store.transform}}>
                <div className="node videoNode" 
                ref={this.nodeRef}>
                    <TopBar store={store} selected={selected}/>
                    <div className="scroll-box">
                        <div className="content">
                            <h3 className="title">{store.title}</h3>
                            <video src={store.url} controls />
                        </div>
                    </div>
                    <div><ResizeHandle store={store} nodeRef={this.nodeRef}/></div>
                </div>
                <div style={{ position: 'absolute', top: '100%',  left: 0, width: '100%' }}>
                    <LinkedNodesBar store={store}/></div>
                </div>
            );
        }
    }
}