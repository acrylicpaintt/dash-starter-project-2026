import { observer } from "mobx-react";
import * as React from "react";
import { FreeformCollectionNodeStore, SelectionStore } from "../../../stores";
import { TopBar } from "../TopBar";
import { ResizeHandle } from "../ResizeHandle";
import { FreeFormCanvas } from "../../freeformcanvas/FreeFormCanvas";
import { LinkedNodesBar } from "../LinkedNodesBar";
import "./FreeformCollectionNodeView.scss";

interface FreeformCollectionNodeProps {
    store: FreeformCollectionNodeStore;
    selected: SelectionStore;
}

@observer
export class FreeformCollectionNodeView extends React.Component<FreeformCollectionNodeProps> {
    private nodeRef = React.createRef<HTMLDivElement>();

    render() {
        if (this.props.store.parent) {
            //need this because freeform collections alter how they're viewed when in a tree canvas vs. in freeform
            if (this.props.store.parent.freeformView === true) {
                this.props.store.freeformView = true;
            }
            else {
                this.props.store.freeformView = false;
            }
        }

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
        
        if (store.selected === true) {
                //if this collection node is selected, return node with a purple border around it
                return (
                    <div style={{transform: store.transform}}>
                <div
                    className="node collectionNode selected"
                    ref={this.nodeRef}
                    style={{
                        width: store.width,
                        height: store.height,
                        
                    }}>
                    <TopBar store={store} selected={selected}/>
                    <div className="content" //onClick={changeSelect}
                    >
                        <h3 className="title">{this.props.store.title}</h3>
                        <div className="freeformcanvas-container nested">
                            <FreeFormCanvas store={store} selectionStore={this.props.selected}/>
                            </div>
                    </div>
                    <ResizeHandle store={store} nodeRef={this.nodeRef} />
                </div>
                <div style={{ position: 'absolute', top: '100%',  left: 0, width: '100%' }}> 
                <LinkedNodesBar store={store}/></div>
                </div>
                );
            } else {
                //if not, remove purple border
                return (
                 <div style={{transform: store.transform}}>
                <div
                    className="node collectionNode"
                    ref={this.nodeRef}
                    style={{
                        width: store.width,
                        height: store.height,
                        
                    }}>
                    <TopBar store={store} selected={selected}/>
                    <div className="content"//onClick={changeSelect} 
                    >
                        
                        <h3 className="title">{this.props.store.title}</h3>
                        <div className="freeformcanvas-container nested">
                            <FreeFormCanvas store={store} selectionStore={this.props.selected}/>
                            </div>
                    </div>
                    <ResizeHandle store={store} nodeRef={this.nodeRef} />
                </div>
                <div style={{ position: 'absolute', top: '100%',  left: 0, width: '100%' }}> 
                <LinkedNodesBar store={store}/></div>
                </div>
                );
            }
            
    }
}
