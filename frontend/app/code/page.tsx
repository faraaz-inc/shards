"use client"
import { useEffect, useState } from "react";
import { XTerminal } from "../components/terminal";
import { useSearchParams } from "next/navigation";
import { File, RemoteFile, Type } from "../components/external/utils/file-manager";
import { Socket, io } from "socket.io-client";
import { Editor } from "./editor";

export default function() {
    const [podCreated, setPodCreated] = useState<boolean>(true);
    const searchParams = useSearchParams();
    const shardId = searchParams.get("shardId") ?? "";

    //send an http request to spin up a new pod with the given shard ID

    if(!podCreated) {
        return <div>
            Booting up the pod...
        </div>
    }

    return <PostPodCreation />
}


export function PostPodCreation() {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const searchParams = useSearchParams();
    const shardId = searchParams.get("shardId") ?? "";
    const [loaded, setLoaded] = useState(false);
    const [fileStructure, setFileStructure] = useState<RemoteFile[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

    const socket = useSocket(shardId);


    useEffect(() => {
        //websocket for terminal
        const ws = new WebSocket("ws://localhost:7007");
        
        ws.onopen = () => {
            setWs(ws);
        }    
    },[]);

    //socket io for file manager
    useEffect(() => {
        if (socket) {
            socket.on('loaded', ({ rootContent }: { rootContent: RemoteFile[]}) => {
                setLoaded(true);
                setFileStructure(rootContent);
            });
        }
    }, [socket]);

    const onSelect = (file: File) => {
        if (file.type === Type.DIRECTORY) {
            socket?.emit("fetchDir", file.path, (data: RemoteFile[]) => {
                setFileStructure(prev => {
                    const allFiles = [...prev, ...data];
                    return allFiles.filter((file, index, self) => 
                        index === self.findIndex(f => f.path === file.path)
                    );
                });
            });
        } else {
            socket?.emit("fetchContent", { path: file.path }, (data: string) => {
                file.content = data;
                setSelectedFile(file);
            });
        }
    };

    const fetchRootContents = () => {
        socket?.emit("fetchDir", "", (data: RemoteFile[]) => {
            setFileStructure(prev => {
                const allFiles = [...prev, ...data];
                return allFiles.filter((file, index, self) => 
                    index === self.findIndex(f => f.path === file.path)
                );
            });
        })
    }


    if(!ws || !socket) {
        return <div>
          Connecting...
        </div>
    }

    return <div className="grid grid-cols-6">
        <div className="col-span-4">
            <Editor socket={socket} selectedFile={selectedFile} fetchRootContents={fetchRootContents} onSelect={onSelect} files={fileStructure} />
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



function useSocket(replId: string) {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(`ws://localhost:7008`);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [replId]);

    return socket;
}
