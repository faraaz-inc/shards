"use client"
import { useEffect, useState } from "react";
import { CodeEditor } from "../components/codeEditor";
import { XTerminal } from "../components/terminal";

export default function() {
    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:7007");
        setWs(ws);


        return () => {
            // ws.close();
        }
    
    },[])

    if(!ws) {
        return <div>
          Connecting...
        </div>
      }

    return <div className="grid grid-cols-6">
        <div className="col-span-4">
            <CodeEditor height="650px" theme="vs-dark" language="javascript" />
        </div>
        <div className="col-span-2">
            <div className="h-[300px]">
                Output screen
            </div>
            <div className="h-[350px]">
                <XTerminal ws={ws} />             
            </div>
        </div>
    </div>
}