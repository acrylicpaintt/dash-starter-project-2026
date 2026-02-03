import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore, TextNodeStore, StoreType, VideoNodeStore,ImageNodeStore, TreeCollectionNodeStore, FreeformCollectionNodeStore,WebsiteNodeStore, SelectionStore } from "../../stores";
import { TextTextView, VideoNodeView, ImageTextView, WebsiteNodeView, FreeformCollectionNodeView, TreeCollectionNodeView } from "../nodes";
import "./TreeCanvas.scss";

interface TreeCanvasProps {
    store: NodeCollectionStore,
    selectionStore: SelectionStore
}

@observer
export class TreeCanvas extends React.Component<TreeCanvasProps> {

    render() {
        let store = this.props.store;
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
                                    return (<VideoNodeView key={nodeStore.Id}  selected={this.props.selectionStore} store={nodeStore as VideoNodeStore}/>)

                                case StoreType.Image:
                                    return (<ImageTextView key={nodeStore.Id}  selected={this.props.selectionStore} store={nodeStore as ImageNodeStore}/>)

                                case StoreType.Website:
                                    return (<WebsiteNodeView key={nodeStore.Id}  selected={this.props.selectionStore} store={nodeStore as WebsiteNodeStore}/>)

                                case StoreType.CollectionFreeform:
                                    return (<FreeformCollectionNodeView key={nodeStore.Id} selected={this.props.selectionStore} store={nodeStore as FreeformCollectionNodeStore}/>)

                                case StoreType.CollectionTree:
                                    return (<TreeCollectionNodeView key={nodeStore.Id} selected={this.props.selectionStore} store={nodeStore as TreeCollectionNodeStore}/>)
                                
                                default:
                                    return (null);
                            }
                        })
                    }
                </div>
            </div>
        );
    }
}
