"use client"
import { Terminal } from "@xterm/xterm";
import { useEffect, useRef } from "react";
import "@xterm/xterm/css/xterm.css"


export function XTerminal({ ws }: {ws: WebSocket}) {
    const inputBufferRef = useRef<string>("");
    const terminalRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        const terminal: Terminal = new Terminal();
        // const ws = new WebSocket("ws://localhost:3003");

        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: "requestTerminal",
                payload: {
                    shardId: "1"
                }
            }))
        }

        if(terminalRef.current)
            terminal.open(terminalRef.current);


        terminal.onKey(({ key, domEvent }) => {
            if (domEvent.key === "Enter") {
                //move to new line
                terminal.write("\r\n");
;                // Send the full command with an additional "\r" at the end

                ws.send(JSON.stringify({
                    type: "terminalData",
                    payload: {
                        shardId: "1",
                        data: inputBufferRef.current + "\r" // Append "\r" before sending
                    }
                }));
                inputBufferRef.current = ""; // Clear the buffer
            } else if (domEvent.key === "Backspace") {
                // Handle backspace - remove last character from the buffer
                inputBufferRef.current = inputBufferRef.current.slice(0, -1);
                terminal.write("\b \b"); // Erase the character visually
            } else {
                // Add the character to the buffer
                inputBufferRef.current += key;
                terminal.write(key);  // Show the character in the terminal
            }
        });

    
        ws.onmessage = (e) => {
            //terminal data
            const data = JSON.parse(e.data);
            if(data.type === "terminalData") {
                terminal.write(data.data);
            }


        }

        return () => {
            // terminal.dispose();
            // terminalRef.current = null;
        }
    }, []);

    return <div ref={terminalRef}></div>
}