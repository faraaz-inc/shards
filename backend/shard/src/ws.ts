import { WebSocketServer, WebSocket } from "ws";
import { TerminalManager } from "./pty";
import { IncomingMsg } from "./types/ws";

export function initWs() {

    const wss = new WebSocketServer({ port: 7007 });
    const terminalManager = new TerminalManager();

    wss.on("connection", (ws) => {
        console.log("Websocket connection established");
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
            }
        });
    });
}