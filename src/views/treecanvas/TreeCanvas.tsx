import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore, TextNodeStore, StoreType, VideoNodeStore,ImageNodeStore, TreeCollectionNodeStore, FreeformCollectionNodeStore,WebsiteNodeStore, SelectionStore } from "../../stores";
import { TextTextView, VideoTextView, ImageTextView, WebsiteTextView, FreeformCollectionTextView, TreeCollectionTextView } from "../nodes";
import "./TreeCanvas.scss";
import { FreeFormCanvas } from "../freeformcanvas/FreeFormCanvas";

interface TreeCanvasProps {
    store: NodeCollectionStore,
    selectionStore: SelectionStore
}

@observer
export class TreeCanvas extends React.Component<TreeCanvasProps> {

    render() {
        let store = this.props.store;

        if (store.freeformView !== true) {
            return (
                <div className="treecanvas-container" >
                    <div className="treecanvas">
                        {   
                            // maps each item in the store to be rendered in the tree canvas as text based on the node type
                            store.nodes.map(nodeStore => {
                                switch (nodeStore.type) {
                                    case StoreType.Text:
                                        return (<TextTextView key={nodeStore.Id}  selected={this.props.selectionStore} store={nodeStore as TextNodeStore}/>)

                                    case StoreType.Video:
                                        return (<VideoTextView key={nodeStore.Id}  selected={this.props.selectionStore} store={nodeStore as VideoNodeStore}/>)

                                    case StoreType.Image:
                                        return (<ImageTextView key={nodeStore.Id}  selected={this.props.selectionStore} store={nodeStore as ImageNodeStore}/>)

                                    case StoreType.Website:
                                        return (<WebsiteTextView key={nodeStore.Id}  selected={this.props.selectionStore} store={nodeStore as WebsiteNodeStore}/>)

                                    case StoreType.CollectionFreeform:
                                        return (<FreeformCollectionTextView key={nodeStore.Id} selected={this.props.selectionStore} store={nodeStore as FreeformCollectionNodeStore}/>)

                                    case StoreType.CollectionTree:
                                        return (<TreeCollectionTextView  key={nodeStore.Id} selected={this.props.selectionStore} store={nodeStore as TreeCollectionNodeStore}/>)
                                    
                                    default:
                                        return (null);
                                }
                            })
                        }
                    </div>
                </div>
            );
        }
        else {
            return (
                <FreeFormCanvas store={store} selectionStore={this.props.selectionStore}/>
            );
        }
    }
}
