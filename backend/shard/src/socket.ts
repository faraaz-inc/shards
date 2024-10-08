import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
// import { saveToS3 } from "./aws";
import { fetchDir, fetchFileContent, saveFile } from "./files";

export function initSocketio(httpServer: HttpServer) {
    const io = new Server(httpServer, {
        cors: {
            // Should restrict this more!
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    const nsp = io.of("/socketio");
      
    nsp.on("connection", async (socket) => {
        console.log("Socket.io connection established");
        // Auth checks should happen here
        const host = socket.handshake.headers.host;
        console.log(`host is ${host}`);
        // Split the host by '.' and take the first part as shardId
        const shardId = host?.split('.')[0];
    
        if (!shardId) {
            socket.disconnect();
            return;
        }

        socket.emit("loaded", {
            rootContent: await fetchDir("/workspace", "")
        });

        initHandlers(socket, shardId);
    });
}

function initHandlers(socket: Socket, shardId: string) {

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

    socket.on("fetchDir", async (dir: string, callback) => {
        const dirPath = `/workspace/${dir}`;
        const contents = await fetchDir(dirPath, dir);
        callback(contents);
    });

    socket.on("fetchContent", async ({ path: filePath }: { path: string }, callback) => {
        const fullPath = `/workspace/${filePath}`;
        const data = await fetchFileContent(fullPath);
        callback(data);
    });

    // Should be validated for size
    // Should be throttled before updating S3 (or use an S3 mount)

    socket.on("updateContent", async ({ path: filePath, content }: { path: string, content: string }) => {
        const fullPath =  `/workspace/${filePath}`;
        await saveFile(fullPath, content);
        // await saveToS3(`code/${shardId}`, filePath, content);
    });

}