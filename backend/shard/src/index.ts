import { createServer } from "http";
import { initWs } from "./ws";
import express from "express";
import cors from "cors";
import { initSocketio } from "./socket";

const workspace = "/workspace";

//websocket server for terminal, port 7007
initWs();


//socket io for file manager
const app = express();
app.use(cors());
const httpServer = createServer(app);

initSocketio(httpServer);

const port = process.env.PORT || 7008;

httpServer.listen(port, () => {
    console.log("Socket.io listening on port: " + port);
});

