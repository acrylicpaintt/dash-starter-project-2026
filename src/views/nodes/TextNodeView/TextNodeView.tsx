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
        return (
            <div
                className="node textNode"
                ref={this.nodeRef}
                style={{ transform: store.transform }}
                onWheel={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}>
                <TopBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <div className="title">
                            <ReactQuill 
                                value={store.title}
                                onChange={this.handleTitleChange}
                                theme="snow"
                                placeholder="Title..."
                                
                                modules={{
                                    toolbar: [
                                        ['bold', 'italic', 'underline']
                                    ]
                                }}
                            />
                        </div>
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

//currently you have to click on one of the buttons to interact with the text and 
// //its hard to move around it -- try to see if there is a work around ???? when u have time
// on this note maybe make it so u are able to edit the titles of other nodes and not just when you make them