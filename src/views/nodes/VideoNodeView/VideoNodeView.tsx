import { observer } from "mobx-react";
import * as React from 'react';
import { VideoNodeStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import { ResizeHandle } from "./../ResizeHandle";
import "./VideoNodeView.scss";

interface VideoNodeProps {
    store: VideoNodeStore;
}

@observer
export class VideoNodeView extends React.Component<VideoNodeProps> {
    private nodeRef = React.createRef<HTMLDivElement>();

    render() {
        let store = this.props.store;
        return (
            <div className="node videoNode"  ref={this.nodeRef} style={{ transform: store.transform }}>
                <TopBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.title}</h3>
                        <video src={store.url} controls />
                    </div>
                </div>
                <div><ResizeHandle store={store} nodeRef={this.nodeRef}/></div>
            </div>
        );
    }
}