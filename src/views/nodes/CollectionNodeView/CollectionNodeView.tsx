import { observer } from "mobx-react";
import * as React from "react";
import { CollectionNodeStore, SelectionStore } from "../../../stores";
import { TopBar } from "../TopBar";
import { ResizeHandle } from "../ResizeHandle";
import { FreeFormCanvas } from "../../freeformcanvas/FreeFormCanvas";
import "./CollectionNodeView.scss";

interface CollectionNodeProps {
    store: CollectionNodeStore;
    selected: SelectionStore;
}

@observer
export class CollectionNodeView extends React.Component<CollectionNodeProps> {
    private nodeRef = React.createRef<HTMLDivElement>();

     
    render() {
         let store = this.props.store;
         let selected = this.props.selected;

        function changeSelect(e: React.MouseEvent) {
            //alters the selection state of the node
             e.stopPropagation();
            store.setSelected(!store.selected);
            //if it is already selected, deselects it
            //vice versa
            if (store.selected) {
                selected.addToSelected(store);
            }
            else{
                selected.removeFromSelected(store);
            }
            
        }

            if (store.selected == true) {
                //if this collection node is selected, return node with a purple border around it
                return (
                <div
                    className="node collectionNode selected" onClick={changeSelect} //onClick so if anywhere on the node is clicked, will be selectd/deselected
                    ref={this.nodeRef}
                    style={{
                        transform: store.transform,
                        width: store.width,
                        height: store.height,
                        
                    }}>
                    <TopBar  store={store} />
                    <div className="content">
                        <h3 className="title">Collection Node</h3>
                        <FreeFormCanvas store={store} selectionStore={this.props.selected}/>
                    </div>
                    <ResizeHandle store={store} nodeRef={this.nodeRef} />
                </div>
                );
            } else {
                //if not, remove purple border
                return (
                <div
                    className="node collectionNode" //onClick so if anywhere on the node is clicked, will be selectd/deselected
                    onClick={changeSelect}
                    ref={this.nodeRef}
                    style={{
                        transform: store.transform,
                        width: store.width,
                        height: store.height,
                        
                    }}>
                    <TopBar store={store} />
                    <div  className="content">
                        <h3 className="title">Collection Node</h3>
                        <FreeFormCanvas store={store} selectionStore={this.props.selected}/>
                    </div>
                    <ResizeHandle store={store} nodeRef={this.nodeRef} />
                </div>
                );
            }
            
    }
}
