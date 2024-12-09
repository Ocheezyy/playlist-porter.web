// import { getUserObject } from "@/app/client-functions/get-user-object";
// import { checkExternalAccount } from "@/app/client-functions/check-external-account";
import NoConnections from "@/components/(client)/no-connections";
// import getPlaylists from "@/app/client-functions/shared/get-playlists";
// import Playlists from "@/app/(client)/client/playlists";


export default function AppHome() {
    // const userObj = await getUserObject();
    // const spotifyAccount = await checkExternalAccount(userObj, "oauth_spotify");
    // const appleAccount = await checkExternalAccount(userObj, "oauth_apple");
    // const initialPlaylists = await getPlaylists(userObj);

    return <NoConnections />;
    // if ((!spotifyAccount || spotifyAccount.externalId === "") && (!appleAccount || appleAccount.externalId === "")) {
    //     return <NoConnections />;
    // }
    //
    // return <Playlists initialPlaylists={initialPlaylists} />;
}

