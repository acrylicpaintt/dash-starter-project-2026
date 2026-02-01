import { observer } from "mobx-react";
import * as React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TextNodeStore } from "../../../stores";
import { TopBar } from "../TopBar";
import { ResizeHandle } from "../ResizeHandle";
import "./../NodeView.scss";
import "./TextNodeView.scss";

interface TextNodeProps {
    store: TextNodeStore;
}

@observer
export class TextNodeView extends React.Component<TextNodeProps> {
    private nodeRef = React.createRef<HTMLDivElement>();

    handleTitleChange = (value: string) => {
        this.props.store.title = value;
    }

    handleTextChange = (value: string) => {
        this.props.store.text = value;
    }


    render() {
        
        let store = this.props.store;
        
        function changeSelect(e: React.MouseEvent) {
            //alters the selection state of the node
                e.stopPropagation();
            store.setSelected(!store.selected);
            //if it is already selected, deselects it
            //vice versa
        }
        
        if (store.selected == true) {
            //if this collection node is selected, return node with a purple border around it
            return (
                <div
                    className="node textNode selected" onClick={changeSelect}
                    ref={this.nodeRef} style={{ transform: store.transform }}
                    onWheel={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                    }}>
                    <TopBar store={store}/>
                    <div className="scroll-box">
                        <div className="content">
                            <h3 className="title">Text Node</h3>
                            <div className="text">
                        
                                <ReactQuill 
                                    value={store.text}
                                    onChange={this.handleTextChange}
                                    theme="snow"
                                    placeholder="Enter text..."
                                    modules={{
                                        toolbar: [
                                            ['bold', 'italic', 'underline'],
                                            [{ 'list': 'ordered'}, { 'list': 'bullet' }]
                                        ]
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <ResizeHandle store={store} nodeRef={this.nodeRef}/>
                </div>
            );
        }
        else {
            //if not, remove purple border
            return(
                <div
                    className="node textNode" onClick={changeSelect}
                    ref={this.nodeRef} style={{ transform: store.transform }}
                    onWheel={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                    }}>
                    <TopBar store={store}/>
                    <div className="scroll-box">
                        <div className="content">
                            <h3 className="title">Text Node</h3>
                            <div className="text">
                        
                                <ReactQuill 
                                    value={store.text}
                                    onChange={this.handleTextChange}
                                    theme="snow"
                                    placeholder="Enter text..."
                                    modules={{
                                        toolbar: [
                                            ['bold', 'italic', 'underline'],
                                            [{ 'list': 'ordered'}, { 'list': 'bullet' }]
                                        ]
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <ResizeHandle store={store} nodeRef={this.nodeRef}/>
                </div>
            );
        }
    }
}

//currently you have to click on one of the buttons to interact with the text and 
// //its hard to move around it -- try to see if there is a work around ???? when u have time
