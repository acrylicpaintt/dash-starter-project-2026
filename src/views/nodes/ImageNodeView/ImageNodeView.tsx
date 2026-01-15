import { observer } from "mobx-react";
import * as React from 'react';
import { ImageNodeStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import { ResizeHandle } from "./../ResizeHandle";
import "./ImageNodeView.scss";

interface ImageNodeProps {
    store: ImageNodeStore;
}

@observer
export class ImageNodeView extends React.Component<ImageNodeProps> {
    private nodeRef = React.createRef<HTMLDivElement>();

    render() {
        let store = this.props.store;
        return (
            <div className="node imageNode"  ref={this.nodeRef} style={{ transform: store.transform }}>
                <TopBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.title}</h3>
                        <img src={store.url} alt=""/>
                    </div>
                </div>
                <div><ResizeHandle store={store} nodeRef={this.nodeRef}/></div>
            </div>
        );
    }
}