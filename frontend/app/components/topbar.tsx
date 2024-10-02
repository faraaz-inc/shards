"use client"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"


export function Topbar() {
    const searchParams = useSearchParams();
    const shardId = searchParams.get("shardId") ?? "";
    const router = useRouter();

    const exit = async() => {
        try {
            //@ts-ignore
            const res = await axios.delete(`http://frztech.test:3000`, { data: { slug: shardId } },);
            //@ts-ignore
            if(res.data.success) {
                router.push("http://frztech.test:3001/");
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    return <div className="text-xl px-3 py-3 flex justify-between">
        <div className="font-semibold text-3xl">
            Shards
        </div>
        <div className="">
            <div onClick={exit} className="bg-accentRedBg text-accentRed px-4 py-1 rounded-lg mr-5 hover:cursor-pointer">
                Exit
            </div>
        </div>
    </div>
}