interface AppleSliceState {
    playlists: ApplePlaylist[];
    songsNotFound: string[];
    transferDone: boolean;
    currentPlaylist: string;
    currentSong: string;
}

interface SpotifyTempMap {
    [key: string]: {
        name: string;
        description: string;
    };
}

interface SpotifySliceState {
    accessToken: string;
    playlists: SpotifyPlaylist[];
    transfer: any[];
    loaded: boolean;
    likedSongData: SpotifyTrack[];
    tempMap: SpotifyTempMap;
    transferReady: boolean;
}

interface AuthSliceState {
    clerkToken: string;
}

interface SpotifyUpdatePlaylistAction {
    playlists: SpotifyPlaylistData[];
    likedSongData: SpotifyTrack[];
    tempMap: SpotifyTempMap;
}

interface SpotifyTransferAction {
    payload: string[];
    type: string;
}

interface SpotifyPlaylistData {
    name: string;
    no_of_songs: number;
    playlist_owner: string;
    image: string; // TODO: come back to
    id: string;
    isChecked: boolean;
}


interface LikedSongData {
    trackName: string;
    artistName: string[];
    albumName: string;
    albumArtist: string[];
}

interface PlaylistToBeTransferred {
    name: string;
    description: string;
    tracks: SpotifyTrack[];
}