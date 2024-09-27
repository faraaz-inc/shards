import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";

export function CodeEditor({height, theme, language}: {height: string, theme: string, language: string}) {
    
    const [value, setValue] = useState<string | undefined>("");
    const editorRef = useRef<any>();

    return <div className="grid grid-cols-4">
        <div className="">
            Sidebar
        </div>
        <div className="col-span-3">
            <div className="rounded-md overflow-hidden w-full">
                <Editor 
                    height={height} 
                    theme={theme} 
                    language={language} 
                    defaultLanguage="javascript" 
                    defaultValue="" 
                    value={value}
                    onChange={(value) => {
                            setValue(value);
                            console.log(value);
                        }
                    }
                    onMount={(editor) => {
                        editorRef.current = editor
                        editor.focus();
                    }} 
                    />
            </div>
        </div>
    </div> 
    
}