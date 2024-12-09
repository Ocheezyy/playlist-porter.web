import { Outlet } from "react-router";
import Header from "@/components/(home)/header.tsx";

export default function HomeLayout() {

    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}