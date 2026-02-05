import { observer } from "mobx-react";
import * as React from "react";
import { NodeStore } from "../../../stores";
import "./LinkedNodesBar.scss";
import { Constants } from "../../../Constants";

interface LinkedNodesBarProps {
  store: NodeStore;
}

//REFERENCE: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
//https://css-tricks.com/using-requestanimationframe/ 
@observer
export class LinkedNodesBar extends React.Component<LinkedNodesBarProps> {
    private animationId: number | null = null;
    //fyi structure helped from claude, i asked the dash slack about this :))
    moveToLink = (node: NodeStore) => {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        let canvas = this.props.store.parent;
        
        if (canvas) {
            const targetX = -node.x + window.innerWidth / 2 - Constants.X_DISPLACEMENT;
            const targetY = -node.y + window.innerHeight / 2 - Constants.Y_DISPLACEMENT;
            const initX = canvas.x;
            const initY = canvas.y;
            const time = 700; 
            const start = performance.now();
            
            const easeInOutCubic = (x: number): number => {
                return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
            };
            //from https://easings.net/
            
            const moveCanvas = (currentTime: number) => {
                //defines animation to move canvas
                const elapsed = currentTime - start;
                const current = Math.min(elapsed / time, 1);
                
                const currTime = easeInOutCubic(current);
                
                if (canvas){
                    //canvas is initialized, but it technically 'can' be null so thats why this is here
                    canvas.x = initX + (targetX - initX) * currTime;
                    canvas.y = initY + (targetY - initY) * currTime;
                }

                if (current < 1) {
                    //while we have not reached hte end of the animation
                    this.animationId = requestAnimationFrame(moveCanvas);
                } else {
                    this.animationId = null;
                }
            };
            
            //starts the animation 
            this.animationId = requestAnimationFrame(moveCanvas);
        }
    }
  
    render() {
        const { store } = this.props;

        return (
            <div className="linkednodesbar">
                {store.linkedNodes.map((node, index) => (
                    <button className="linkednodes" style={{ marginLeft: store.width}} 
                    key={index} onClick={() => this.moveToLink(node)}>
                        {node.title}
                    </button>
                ))}
            </div>
        );
    }
}