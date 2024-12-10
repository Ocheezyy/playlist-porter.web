import ClientAccountCards from "@/components/(client)/accounts/client-account-cards";
import { useSelector } from "react-redux";
import { ReduxState } from "@/store.ts";
import { isLoggedIn as appleIsLoggedIn } from "@/client-functions/apple/apple-auth";
import Playlists from "@/components/(client)/playlists";


export default function AppHome() {
    const spotifyToken: string = useSelector<ReduxState>(state => state.spotify.accessToken) as string;
    const spotifyLoggedIn = !!spotifyToken && spotifyToken !== "";
    const appleLoggedIn = appleIsLoggedIn();

    if (!spotifyLoggedIn && !appleLoggedIn) {
        return <ClientAccountCards />;
    }
    return <Playlists initialPlaylists={{ apple: [], spotify: [] }} />;

    // if ((!spotifyAccount || spotifyAccount.externalId === "") && (!appleAccount || appleAccount.externalId === "")) {
    //     return <NoConnections />;
    // }
    //
    // return <Playlists initialPlaylists={initialPlaylists} />;
}

