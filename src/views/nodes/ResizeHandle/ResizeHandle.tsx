import { observer } from "mobx-react";
import * as React from 'react'; 
import { NodeStore } from "../../../stores"; 
import "./ResizeHandle.scss"; 

interface ResizeHandleProps {
    store: NodeStore;
    nodeRef: React.RefObject<HTMLDivElement>;
}

@observer
export class ResizeHandle extends React.Component<ResizeHandleProps> {

    private isPointerDown = false;
    private startX = 0;
    private startY = 0;
    private startWidth = 0;
    private startHeight = 0;
    private activePointerId: number | null = null;
    private select = false;

    onPointerDown = (e: React.PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();

        const node = this.props.nodeRef.current;
        if (!node) return;

        this.startX = e.clientX;
        this.startY = e.clientY;
        this.startWidth = node.offsetWidth;
        this.startHeight = node.offsetHeight;
        this.activePointerId = e.pointerId;
        this.isPointerDown = true;
        this.select = true;

        document.removeEventListener("pointermove", this.onPointerMove);
        document.addEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
        document.addEventListener("pointerup", this.onPointerUp);
    };

    onPointerMove = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        if (!this.isPointerDown) return;
        if (e.pointerId !== this.activePointerId) return;

        const dx = e.clientX - this.startX;
        const dy = e.clientY - this.startY;

        const node = this.props.nodeRef.current;
        if (!node) return;

        node.style.width = `${Math.max(50, this.startWidth + dx)}px`;
        node.style.height = `${Math.max(30, this.startHeight + dy)}px`;

        this.props.store.width = Math.max(50, this.startWidth + dx);
        this.props.store.height = Math.max(30, this.startHeight + dy);
    };

    onPointerUp = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        if (e.pointerId !== this.activePointerId) return;
        this.isPointerDown = false;

        document.removeEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
    };

    render() {
        return <div className="resizehandle" onPointerDown={this.onPointerDown}/>;
    }
}
