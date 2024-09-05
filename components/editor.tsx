/* trunk-ignore-all(prettier) */
'use client';

import {
    BlockNoteEditor,
    PartialBlock
} from "@blocknote/core";

import {
    BlockNoteViewRaw,
    useCreateBlockNote
} from "@blocknote/react";
import{
    BlockNoteView
}from"@blocknote/mantine";
import { useTheme } from "next-themes";
import "@blocknote/core/style.css";
import"@blocknote/mantine/style.css";
import { useEdgeStore } from "@/lib/edgestore"; 

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
}

 const Editor = ({
    onChange,
    initialContent,
    editable = true // Assuming true by default, adjust as needed
}: EditorProps) => {
    const {resolvedTheme} = useTheme();
    const {edgestore} = useEdgeStore();

    const handleUpload = async (file: File) => {
        const response=await edgestore.publicFiles.upload({file});
        return response.url;
    }
    // Initialize the editor with the provided options

    const editor = useCreateBlockNote({
            initialContent: initialContent
                ? (JSON.parse(initialContent) as PartialBlock[])
                : undefined,
            uploadFile: handleUpload
    });
 
    

    return (
        <div>
            {/* Render the editor view */}
            <BlockNoteView editor={editor}
            theme={resolvedTheme ==='dark'?'dark':'light'} onChange={() => {
                // console.log("here");
                onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
                // JSON.stringify(editor.topLevelBlocks, null, 2)
            }} editable={editable}/>
        </div>
    );
};      

export default Editor;
