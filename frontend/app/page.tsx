"use client"
import { useEffect, useState } from "react";
import { XTerminal } from "./components/terminal";

export default function Home() {
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3003");

    setWs(ws);

  },[])

  if(!ws) {
    return <div>
      Connecting...
    </div>
  }

  return (
    <div>
      <XTerminal ws={ws} />
    </div>
  );
}
