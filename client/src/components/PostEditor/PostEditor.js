import ReactDOM from "react-dom";
import React from "react";

import EditorJs from "react-editor-js";

import { EDITOR_JS_TOOLS } from "../../utils/constants.js";

const PostEditor = ({ savePost, postContent }) => {
    const instanceRef = React.useRef(null);

    async function handleSave(e) {
        e.preventDefault()
        const savedData = await instanceRef.current.save();
        console.log("savedData", savedData);
        savePost(savedData)
    }

    return (
        <React.Fragment>
            <EditorJs
                instanceRef={instance => (instanceRef.current = instance)}
                tools={EDITOR_JS_TOOLS}
                data={postContent ? postContent : {
                    time: 1556098174501,
                    blocks: [
                        {
                            type: "paragraph",
                            data: {
                                text:
                                    "Write a paragraph!"
                            }
                        },
                        {
                            type: "paragraph",
                            data: {
                                text:
                                    "Write another paragraph"
                            }
                        },
                        {
                            type: "header",
                            data: {
                                text: "You can write a title too",
                                level: 3
                            }
                        },
                        {
                            type: "list",
                            data: {
                                style: "unordered",
                                items: [
                                    "Add",
                                    "A",
                                    "List",
                                    "Here."
                                ]
                            }
                        },
                        {
                            type: "paragraph",
                            data: {
                                text:
                                    "And... another paragraph"
                            }
                        },
                    ],
                    version: "2.12.4"
                }}
            />
            <button style={{ color: 'white' }} onClick={(e) => handleSave(e)}>Save!</button>

        </React.Fragment>
    );
};
export default PostEditor;
