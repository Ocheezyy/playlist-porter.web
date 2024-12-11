import MusicKitInstance = MusicKit.MusicKitInstance;

type AccountProvider = "oauth_spotify" | "oauth_apple";

interface Playlists {
    spotify: SpotifyPlaylist[];
    apple: ApplePlaylist[];
}

type ResolveFunction = (value: unknown) => void;
type RejectFunction = (error: unknown) => void;

type Platform = "spotify" | "apple" | string;

interface SpotifyRestriction {
    reason: "market" | "product" | "explicit";
}

interface SpotifyArtist {
    external_urls: {
        spotify: string;
    }
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

interface SpotifyTrack {
    album : {
        album_type: string;
        total_tracks: number;
        available_markets: string[];
        external_urls: {
            spotify: string;
        }
        href: string; // api endpoint
        id: string; // spotify_id
        images: {
            url: string;
            height: number;
            width: number;
        }[];
        name: string;
        release_date: string;
        release_date_precision: "year" | "month" | "day";
        restrictions: SpotifyRestriction;
        type: "album";
        uri: string; //
        artists: SpotifyArtist[];
    }
    artists: SpotifyArtist[];
    available_markets: string[];
    disc_number: integer;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        isrc: string;
        ean: string;
        upc: string;
    }
    external_urls: {
        spotify: string; // URL
    }
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: object;
    restrictions: SpotifyRestriction;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: "track";
    uri: string;
    is_local: boolean;
}


interface SpotifyPlaylistTracks {
    href: string;
    limit: number;
    next: string; // URL
    offset: number;
    previous: string; // URL
    total: number;
    items: SpotifyTrackItem[];
}

interface SpotifyTrackItem {
    added_at: string; // date-time
    added_by: {
        external_urls: {
            spotify: string;
        }
        href: string; // URL
        id: string // user_id
        type: string;
        uri: string; // user url
    };
    is_local: boolean;
    track: SpotifyTrack;
}

type SpotifyPlaylist = {
    collaborative: boolean;
    description: string;
    external_urls: { spotify: string; }
    href: string;
    id: string;
    images: Array<{
        height: number;
        url: string;
        width: number;
    }>
    name: string;
    owner: {
        display_name: string;
        external_urls: { spotify: string };
        href: string;
        id: string;
        type: string;
        uri: string;
    }
    primary_color: string | null;
    public: boolean;
    snapshot_id: string;
    tracks: {
        href: string;
        total: number;
    }
    type: "playlist";
    uri: string;
};

type ApplePlaylist = {
    id: string;
};

interface PlaylistsProps {
    initialPlaylists: Playlists | null;
}

interface SpotifyPlaylistCardProps {
    playlist: SpotifyPlaylist;
}

interface ApplePlaylistCardProps {
    playlist: ApplePlaylist;
}

interface AppleMusicHeader {
    Authorization: string;
    Accept: string;
    "Content-Type": string;
    "Music-User-Token": string;
}


interface AppleContextProps {
    musicKitLoaded: boolean;
    appleLogin: () => Promise<void>;
    isLoggedIn: () => boolean;
    getMusicInstance: () => MusicKitInstance | undefined;
    getAppleMusicHeader: () => AppleMusicHeader;
    getPlaylists: () => Promise<any>;
}

interface SpotifyTokenJSON {
    access_token: string;
}

interface SpotifySongInfo {
    trackName: string;
    artistName: string[];
    albumName: string;
    albumArtist: string[];
}