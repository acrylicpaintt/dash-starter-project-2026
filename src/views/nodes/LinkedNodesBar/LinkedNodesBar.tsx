import { observer } from "mobx-react";
import * as React from 'react';
import { NodeStore } from "../../../stores";
import "./LinkedNodesBar.tsx";

interface LinkedNodesBarProps {
    store: NodeStore;
}

@observer
export class LinkedNodesBar extends React.Component<LinkedNodesBarProps> {
    render() {
        return (
        <div className="linkednodesbar"/>
            
        )

    }
}
