import { WebSocketServer, WebSocket } from "ws";
import { TerminalManager } from "./pty";
import { readdirSync } from "fs";
import { join } from "path";
import { IncomingMsg } from "./types/ws";
import { fetchDir, readFromFile } from "./files";

const SHELL = "bash";

export function initWs() {

    const wss = new WebSocketServer({ port: 7007 });
    const terminalManager = new TerminalManager();

    wss.on("connection", (ws) => {
        
        ws.on("message", async (message: string) => {
            const msg: IncomingMsg = JSON.parse(message);
            
            switch(msg.type) {
                case "terminalData":
                    terminalManager.write(msg.payload.shardId, msg.payload.data);
                    break;

                case "requestTerminal":

                    terminalManager.spawnTerminal(msg.payload.shardId, (data) => {
                        ws.send(JSON.stringify({
                            type: "terminalData",
                            data
                        }));
                    });

                    break;

                case "fetchDir":
                    const path = msg.payload.path;
                    const files = await fetchDir(path);
                    ws.send(JSON.stringify(files));
                    break;
                case "readFile":
                    const file = msg.payload.path;
                    const content = await readFromFile(file);
                    ws.send(JSON.stringify(content));
                    console.log(content);
                    break;
            }
            
        });
    });
}