import { RedirectToSignIn, SignedOut, useAuth } from "@clerk/clerk-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Outlet } from "react-router";
import { useDispatch } from "react-redux";
import { setClerkToken } from "@/features/auth/auth-reducer.ts";
import { setToken as setSpotifyToken } from "@/features/spotify/spotify-reducer.ts";
import { useEffect } from "react";
import queryString from "query-string";
import { fetchSpotifyPlaylists } from "@/features/spotify/spotify-actions.ts";


export default function ClientLayout() {
    const { getToken: getClerkToken } = useAuth();
    const dispatch = useDispatch();

    async function setClerkTokenC() {
        const token = await getClerkToken();
        dispatch(setClerkToken(token));
    }

    useEffect(() => {
        setClerkTokenC();

        const parsed = queryString.parse(window.location.search);
        if (parsed?.access_token) {
            dispatch(setSpotifyToken(parsed.access_token));
            fetchSpotifyPlaylists(parsed.access_token as string);
        }
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