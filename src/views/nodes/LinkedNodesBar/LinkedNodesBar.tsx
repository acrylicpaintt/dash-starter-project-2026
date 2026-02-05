import { observer } from "mobx-react";
import * as React from "react";
import { NodeCollectionStore, NodeStore } from "../../../stores";
import "./LinkedNodesBar.scss";
import { FreeFormCanvas } from "../../freeformcanvas/FreeFormCanvas";

interface LinkedNodesBarProps {
  store: NodeStore;
}

@observer
export class LinkedNodesBar extends React.Component<LinkedNodesBarProps> {

    moveToLink = (node: NodeStore) => {
        //moves canvas to the node it is linked to
        let canvas = this.props.store.parent; //all freeform canvas (tree canvas dont have buttons in their view)
        
        if (canvas) {
            canvas.x = -node.x + window.innerWidth / 2;
            canvas.y = -node.y + window.innerHeight / 2;
            canvas = canvas.parent;
            //for freeform canvas...?
        }
    }
  
  render() {
    const { store } = this.props;

    return (
        <div className="linkednodesbar">
        
            {store.linkedNodes.map(node=> (
            <button onClick={() => this.moveToLink(node)}>
            {node.title}
            </button>)
        )}  </div>
    );
    
    
  }
}
