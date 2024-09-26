// import { fork } from "child_process";
import { IPty, spawn } from "node-pty";

const SHELL = "sh";

export class TerminalManager {
    private sessions: Sessions;

    constructor() {
        this.sessions = {};
    }

    spawnTerminal(shardId: string, onData: (data: string) => void) {
        let term = spawn(SHELL, ['-c', `stty -echo; exec ${SHELL}`], {
            cols: 100,
            name: 'xterm',
            // cwd: `/workspace`
        });

        term.onData((data: string) => onData(data));

        this.sessions[shardId] = {
            terminal: term
        };

        term.onExit(() => {
            delete this.sessions[term.pid];
        });
        return term;
    }

    write(shardId: string, data: string) {
        this.sessions[shardId].terminal.write(data);
    }

    clear(terminalId: string) {
        this.sessions[terminalId].terminal.kill();
        delete this.sessions[terminalId];
    }
}

interface Sessions {
    [id: string]: {
        terminal: IPty
    }
}