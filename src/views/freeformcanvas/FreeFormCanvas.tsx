import { observer } from "mobx-react";
import * as React from 'react';
import { NodeCollectionStore, TextNodeStore, StoreType, VideoNodeStore,ImageNodeStore, TreeCollectionNodeStore, FreeformCollectionNodeStore,WebsiteNodeStore, SelectionStore } from "../../stores";
import { TextNodeView, VideoNodeView, ImageNodeView, WebsiteNodeView, TreeCollectionNodeView, FreeformCollectionNodeView, } from "../nodes";
import "./FreeFormCanvas.scss";
import { TreeCanvas } from "../treecanvas/TreeCanvas";

interface FreeFormProps {
    store: NodeCollectionStore,
    selectionStore: SelectionStore
}

@observer
export class FreeFormCanvas extends React.Component<FreeFormProps> {

    private isPointerDown: boolean | undefined;

    onPointerDown = (e: React.PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this.isPointerDown = true;
        document.removeEventListener("pointermove", this.onPointerMove);
        document.addEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
        document.addEventListener("pointerup", this.onPointerUp);
    }

    onPointerUp = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this.isPointerDown = false;
        document.removeEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
    }

    onPointerMove = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        if (!this.isPointerDown) return;

        this.props.store.x += e.movementX;
        this.props.store.y += e.movementY;
    }
    

    render() {
        let store = this.props.store;
        if (store.freeformView === true) {
            return (
                <div className="freeformcanvas-container" onPointerDown={this.onPointerDown}>
                    <div className="freeformcanvas" style={{ transform: store.transform }}>
                        {   
                            // maps each item in the store to be rendered in the canvas based on the node type
                            store.nodes.map(nodeStore => {
                                switch (nodeStore.type) {
                    
                                    case StoreType.Text:
                                        return (<TextNodeView key={nodeStore.Id}  selected={this.props.selectionStore} store={nodeStore as TextNodeStore}/>)

                                    case StoreType.Video:
                                        return (<VideoNodeView key={nodeStore.Id}  selected={this.props.selectionStore} store={nodeStore as VideoNodeStore}/>)

                                    case StoreType.Image:
                                        return (<ImageNodeView key={nodeStore.Id}  selected={this.props.selectionStore} store={nodeStore as ImageNodeStore}/>)

                                    case StoreType.Website:
                                        return (<WebsiteNodeView key={nodeStore.Id}  selected={this.props.selectionStore} store={nodeStore as WebsiteNodeStore}/>)

                                    case StoreType.CollectionFreeform:
                                        return (<FreeformCollectionNodeView key={nodeStore.Id} selected={this.props.selectionStore} store={nodeStore as FreeformCollectionNodeStore}/>)
                                    
                                    case StoreType.CollectionTree:
                                        return (<TreeCollectionNodeView key={nodeStore.Id}  selected={this.props.selectionStore} store={nodeStore as TreeCollectionNodeStore}/>)                                
                                    
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
            <TreeCanvas store={store} selectionStore={this.props.selectionStore}/>
            );
        }
    }
}
