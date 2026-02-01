import { observer } from "mobx-react";
import * as React from 'react';
import { WebsiteNodeStore } from "../../../stores";
import "./../NodeView.scss";
import { TopBar } from "./../TopBar";
import { ResizeHandle } from "./../ResizeHandle";
import "./WebsiteNodeView.scss";

interface WebsiteNodeProps {
    store: WebsiteNodeStore;
}

@observer
export class WebsiteNodeView extends React.Component<WebsiteNodeProps> {
    private nodeRef = React.createRef<HTMLDivElement>();

    render() {
        let store = this.props.store;

        function changeSelect(e: React.MouseEvent) {
            //alters the selection state of the node
            e.stopPropagation();
            store.setSelected(!store.selected);
            //if it is already selected, deselects it
            //vice versa
        }
        
        if (store.selected == true) {
            //alters the selection state of the node
            return (
                <div className="node websiteNode selected"  ref={this.nodeRef} 
                onClick={changeSelect} style={{ transform: store.transform }}>
                    <TopBar store={store}/>
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
                <div className="node websiteNode"  onClick={changeSelect} 
                ref={this.nodeRef} style={{ transform: store.transform }}>
                    <TopBar store={store}/>
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