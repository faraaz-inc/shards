"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState<string>("")
  const router = useRouter();

  const clickhandler = async() => {
    const res = await axios.post("http://frztech.test:3000", { slug: value });
    //@ts-ignore
    if(res.data?.success) {
      router.push(`http://${value}.frztech.test:3001/code?shardId=${value}`);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="border-2 border-gray-800 py-10 px-20 rounded-3xl">
        <div className="text-5xl mb-20 text-center font-bold">
          Shards
        </div>
        <div className="text-3xl mb-10 text-gray-400">
          Create New Shard
        </div>
        <div className="ml-2 mb-2">
          Enter a unique ID
        </div>
        <div className="text-center mb-10">
          <input onChange={(e) => setValue(e.target.value)} type="text" className="bg-[#010312] border-[1px] border-gray-600 rounded-xl px-3 py-1" />
        </div>
        <div onClick={clickhandler} className="rounded-full text-center py-3 bg-white text-black hover:cursor-pointer transistion ease-in-out hover:scale-110 duration-300">
          Create Shard
        </div>
      </div>  
    </div>
  );
}
