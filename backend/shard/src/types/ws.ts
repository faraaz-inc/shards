
export type IncomingMsg = {
    type: "terminalData",
    payload: {
        shardId: string,
        data: string
    }
} | {
    type: "requestTerminal",
    payload: {
        shardId: string,
    }
} | {
    type: "fetchDir" | "readFile",
    payload: {
        path: string
    }
}