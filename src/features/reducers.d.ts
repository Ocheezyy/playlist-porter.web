interface AppleSliceState {
    songsNotFound: string[];
    transferDone: boolean;
    currentPlaylist: string;
    currentSong: string;
}

interface SpotifySliceState {
    accessToken: string;
    playlists: string[];
    transfer: string[];
    loaded: boolean;
    likedSongData: string[];
    tempMap: object;
    transferReady: boolean;
}

interface AuthSliceState {
    clerkToken: string;
}

interface SpotifyUpdatePlaylistAction {
    playlists: string[];
    likedSongData: string[];
    tempMap: object;
}

interface SpotifyTransferAction {
    payload: string[];
    type: string;
}
