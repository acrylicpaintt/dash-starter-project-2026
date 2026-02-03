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

    console.log("linkedNodes:", store.linkedNodes.length);

    if (store.linkedNodes.length === 0) return null;

    return (
      <div className="linked-nodes-bar right">
        {store.linkedNodes.map((node) => (
          <button className="linked-node-button"
          >
            TEST
          </button>
        ))}
      </div>
    );
  }
}
