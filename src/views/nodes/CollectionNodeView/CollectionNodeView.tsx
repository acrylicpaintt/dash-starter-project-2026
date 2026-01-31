import { observer } from "mobx-react";
import * as React from "react";
import { CollectionNodeStore } from "../../../stores";
import { TopBar } from "../TopBar";
import { ResizeHandle } from "../ResizeHandle";
import { FreeFormCanvas } from "../../freeformcanvas/FreeFormCanvas";
import "./CollectionNodeView.scss";

interface CollectionNodeProps {
    store: CollectionNodeStore;
}

@observer
export class CollectionNodeView extends React.Component<CollectionNodeProps> {
    private nodeRef = React.createRef<HTMLDivElement>();

    render() {
        const { store } = this.props;

        return (
            <div
                className="node collectionNode"
                ref={this.nodeRef}
                style={{
                    transform: store.transform,
                    width: store.width,
                    height: store.height,
                    
                }}
            >
                <TopBar store={store} />
                <div className="content">
                    <FreeFormCanvas store={store} />
                </div>
                <ResizeHandle store={store} nodeRef={this.nodeRef} />
            </div>
        );
    }
}
