import axios from "axios";
import getApiHeaders from "@/client-functions/get-api-headers.ts";

const instance = window.MusicKit;

export function configure(clerkToken: string) {
    const apiUrl = `${import.meta.env.VITE_API_URL}/apple-token`;
    axios.get(apiUrl, {
        headers: getApiHeaders(clerkToken)
    })
        .then(res => {
            const appleToken: string = res?.data?.token;
            console.log(appleToken);
            instance.configure({
                developerToken: appleToken,
                app: {
                    name: "Playlist Porter",
                    build: "1978.4.1"
                }
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getMusicInstance() {
    return instance.getInstance();
}

export function isLoggedIn() {
    try {
        return getMusicInstance().isAuthorized;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}

export function LogIn() {
    return getMusicInstance().authorize();
}

export function LogOut() {
    return getMusicInstance().unauthorize();
}

export function getHeader() {
    return {
        Authorization: `Bearer ${getMusicInstance().developerToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        "Music-User-Token": getMusicInstance().musicUserToken
    };
}