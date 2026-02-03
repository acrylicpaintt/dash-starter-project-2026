import { observer } from "mobx-react";
import * as React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TextNodeStore, SelectionStore } from "../../../stores";
import { TopBar } from "../TopBar";
import { ResizeHandle } from "../ResizeHandle";
import "./../NodeView.scss";
import "./TextNodeView.scss";

interface TextNodeProps {
    store: TextNodeStore;
    selected: SelectionStore;
}

@observer
export class TextNodeView extends React.Component<TextNodeProps> {
    private nodeRef = React.createRef<HTMLDivElement>();

    handleTextChange = (value: string) => {
        this.props.store.text = value;
    }

    render() {
        let store = this.props.store;
        let selected = this.props.selected
        
        if (store.selected === true) {
            //if this collection node is selected, return node with a purple border around it
            return (
                <div
                    className="node textNode selected" 
                    ref={this.nodeRef} style={{ transform: store.transform }}
                    onWheel={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                    }}>
                    <TopBar store={store} selected={selected}/>
                    <div className="scroll-box">
                        <div className="content">
                            <h3 className="title">{this.props.store.title}</h3>
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
                    className="node textNode" 
                    ref={this.nodeRef} style={{ transform: store.transform }}
                    onWheel={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                    }}>
                    <TopBar store={store} selected={selected}/>
                    <div className="scroll-box">
                        <div className="content">
                            <h3 className="title">{this.props.store.title}</h3>
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
