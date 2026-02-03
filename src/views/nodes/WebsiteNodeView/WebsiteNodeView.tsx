import { observer } from "mobx-react";
import * as React from 'react';
import { WebsiteNodeStore, SelectionStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import { ResizeHandle } from "./../ResizeHandle";
import "./WebsiteNodeView.scss";

interface WebsiteNodeProps {
    store: WebsiteNodeStore;
    selected: SelectionStore;
}

@observer
export class WebsiteNodeView extends React.Component<WebsiteNodeProps> {
    private nodeRef = React.createRef<HTMLDivElement>();

    render() {
        let store = this.props.store;
        let selected = this.props.selected
      
        if (store.selected == true) {
            //alters the selection state of the node
            return (
                <div className="node websiteNode selected"  ref={this.nodeRef} 
                 style={{ transform: store.transform }}>
                    <TopBar store={store} selected={selected}/>
                    <div className="scroll-box">
                        <div className="content">
                            <h3 className="title">{store.title}</h3>
                            <iframe title={store.title} src={store.url} />
                        </div>
                    </div>
                    <div><ResizeHandle store={store} nodeRef={this.nodeRef}/></div>
                </div>
            );
        }
        else {
            return (
                <div className="node websiteNode"  
                ref={this.nodeRef} style={{ transform: store.transform }}>
                    <TopBar store={store} selected={selected}/>
                    <div className="scroll-box">
                        <div className="content">
                            <h3 className="title">{store.title}</h3>
                            <iframe title={store.title} src={store.url} />
                        </div>
                    </div>
                    <div><ResizeHandle store={store} nodeRef={this.nodeRef}/></div>
                </div>
            );
        }
    }
}