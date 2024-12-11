import { addToAppleLibrary } from "@/client-functions/apple/apple-library";
import { updateCurrentPlaylist, updateCurrentSong, transferFinished, songNotFound } from "@/features/apple/apple-reducer";

export function addPlaylistToApple(data) {
    return (dispatch) => {
        return addToAppleLibrary(data);
    };
}

export function updateSongsNotFound(data) {
    return {
        type: songNotFound.type,
        payload: data
    };
}

export function updateTransferFinished() {
    return {
        type: transferFinished.type,
        payload: true
    };
}

export function updateCurrentSearchingSong(data) {
    return {
        type: updateCurrentSong.type,
        payload: data
    };
}

export function updateCurrentSearchingPlaylist(data) {
    return {
        type: updateCurrentPlaylist.type,
        payload: data
    };
}