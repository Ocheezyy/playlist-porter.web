import { RedirectToSignIn, SignedOut } from "@clerk/clerk-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Outlet } from "react-router";


export default function ClientLayout() {

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