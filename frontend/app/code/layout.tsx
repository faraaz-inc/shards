import { ReactNode } from "react";
import { Topbar } from "../components/topbar";

export default function({ children }: { children: ReactNode }) {

    return <div>
        <Topbar />
        {children}
    </div>
}