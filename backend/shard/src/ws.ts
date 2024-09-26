import { WebSocketServer, WebSocket } from "ws";
import { TerminalManager } from "./pty";

const SHELL = "bash";

export function initWs() {

    const wss = new WebSocketServer({ port: 3003 });
    const terminalManager = new TerminalManager();

    wss.on("connection", (ws) => {
        
        ws.on("message", (message: string) => {
            const msg = JSON.parse(message);
            
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
            }
            
        });
    });
}