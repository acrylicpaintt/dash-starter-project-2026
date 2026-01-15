import { observer } from "mobx-react";
import * as React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { StaticTextNodeStore } from "../../../stores";
import { TopBar } from "../TopBar";
import { ResizeHandle } from "../ResizeHandle";
import "./../NodeView.scss";
import "./TextNodeView.scss";

interface TextNodeProps {
    store: StaticTextNodeStore;
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
                        <ReactQuill 
                            value={store.text}
                            onChange={this.handleTextChange}
                            theme="snow"
                            placeholder="Enter text..."
                            modules={{
                                toolbar: [
                                    ['bold', 'italic', 'underline'],
                                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                    ['link']
                                ]
                            }}
                        />
                    </div>
                </div>
                <ResizeHandle store={store} nodeRef={this.nodeRef}/>
            </div>
        );
    }
}