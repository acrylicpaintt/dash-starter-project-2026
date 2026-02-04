import { observer } from "mobx-react";
import * as React from "react";
import { NodeStore } from "../../../stores";
import "./LinkedNodesBar.scss";

interface LinkedNodesBarProps {
  store: NodeStore;
}

@observer
export class LinkedNodesBar extends React.Component<LinkedNodesBarProps> {
  
  render() {
    const { store } = this.props;
    if (store.linkedNodes.length === 0) return null;

    return (
        <div className="linkednodesbar" style={{width: store.width}}>{store.linkedNodes.map(node=> (
            <button >
            {node.title}
            </button>
        )
        )} 
        </div>
    );
    
    
  }
}
