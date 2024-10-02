import { useState } from "react"

export function OutputWindow({ shardId }: { shardId: string }) {
    // const [port, setPort] = useState<number>(5000);
    const [refresh, forceRefresh] = useState<number>(0);

    const reFresh = () => {
        forceRefresh(prev => prev + 1);
        console.log("Refreshed output window");
    }
    return <div className="">
        <div className="flex ml-8">
            <div>
                Output
            </div>
            <div onClick={reFresh} className="ml-3 border-[1px] text-xs border-gray-800 rounded-full px-3 py-1 hover:cursor-pointer w-20 text-center">
                Refresh
            </div>
        </div>
        <div className="m-2 ml-6 rounded-lg overflow-hidden">
            <iframe src={`http://${shardId}.frztech.test:3007/output`} frameBorder={"0"} className="w-full h-[265px] bg-white"></iframe>
        </div>
    </div>
}