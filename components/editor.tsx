'use client'
import React, { useEffect, useRef } from "react";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { PartialBlock } from "@blocknote/core";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";
import { UpdateContent } from "@/lib/actions/updateContent";
import { useSavingStatus } from "@/hooks/use-saving-status";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
    id?: string
}
interface SaveToDBEditor {
    document: PartialBlock[];
}

export default function Editor({
    onChange,
    initialContent,
    editable,
    id
}: EditorProps) {
    const savingStatus = useSavingStatus();
    const { resolvedTheme } = useTheme();
    const { edgestore } = useEdgeStore();
    const latestEditorRef = useRef<SaveToDBEditor | null>(null);

    const uploadFile = async (file: File) => {
        const res = await edgestore.publicFiles.upload({
            file,
        });
        return res.url;
    };
    const saveToDB = async (editor: SaveToDBEditor) => {
        
        if (id) {
            try {
                savingStatus.onIsSaving()
                console.log("Auto-saving to DB:", savingStatus.isSaving);
                const res = await UpdateContent(
                    JSON.stringify(editor.document, null, 2),
                    id
                )
            } catch (error) {
                console.log(error);
            }
            finally{
                savingStatus.onIsSaved()
            }
        }
        else {
            console.error("blogid not found")
        }

    };
    // Creates a new editor instance.
    const editor = useCreateBlockNote({
        initialContent: initialContent
            ? (JSON.parse(initialContent) as PartialBlock[])
            : undefined,
        uploadFile,
    });

    // Auto-save effect
    useEffect(() => {
        const interval = setInterval(() => {
            if (latestEditorRef.current) {
                saveToDB(latestEditorRef.current);
            }
        }, 10000); // 10 seconds
        return () => clearInterval(interval);
    }, []);

    // Renders the editor instance using a React component.
    return (
        <BlockNoteView
            className="min-h-screen  dark:bg-[#1E1F1E] rounded-md"
            theme={resolvedTheme == "dark" ? "dark" : "light"}
            editor={editor}
            editable={editable}
            onChange={(editor) => {
                onChange(JSON.stringify(editor.document, null, 2));
                latestEditorRef.current = editor;
            }}
        />
    );
}