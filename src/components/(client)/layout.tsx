import { RedirectToSignIn, SignedOut, useAuth } from "@clerk/clerk-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Outlet } from "react-router";
import { useDispatch } from "react-redux";
import { setClerkToken } from "@/features/auth/auth-reducer.ts";
import { useEffect } from "react";


export default function ClientLayout() {
    const { getToken } = useAuth();
    const dispatch = useDispatch();

    async function setToken() {
        const token = await getToken();
        dispatch(setClerkToken(token));
    }

    useEffect(() => {
        setToken();
    }, []);

    return (
        <>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
            <SidebarProvider>
                <AppSidebar />
                <SidebarTrigger />
                <Outlet />
            </SidebarProvider>
        </>
    );
}