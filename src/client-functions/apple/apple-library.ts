import { apple_auth } from "./apple-provider";
import store from "@/store";
import { transferFinished, updateCurrentPlaylist, setPlaylists } from "@/features/apple/apple-reducer";
import axios, { AxiosResponse } from "axios";
import { getHeader, isLoggedIn } from "@/client-functions/apple/apple-auth.ts";

export function addToAppleLibrary() {
    const state = store.getState();
    const playlistToTransfer = state.spotify.transfer;
    // @ts-expect-error come back to
    let songsInPlaylists = [];

    playlistToTransfer.forEach((playlist) => {
        // TODO: This could be the cause of an error
        store.dispatch(updateCurrentPlaylist(playlist.name));

        songsInPlaylists = [];
        // @ts-expect-error come back to
        playlist.tracks.forEach((item) => {
            songsInPlaylists.push({ a_name: item.artistName[0], t_name: item.trackName });
        });

        return Promise.all([
            // @ts-expect-error come back to
            songsInPlaylists.map((song) =>
                new Promise((resolve, reject) => {
                    findSong(song.a_name, song.t_name, resolve, reject);
                }))
        ]).then((res) => {
            Promise.all(res[0])
                .then((resolvedPlaylist) => {
                    createPlaylistsInAppleLib({ name: playlist.name, tracks: resolvedPlaylist }, playlistToTransfer.indexOf(playlist), playlistToTransfer.length);
                });
        });
    });
}

export function findSong(artist: string, song: string, resolve: ResolveFunction, reject: RejectFunction) {

    let extractedSong = extractSongNameVerbose(song);
    let searchParam = artist + " " + extractedSong.replace(/ /g, "+");

    extractedSong = encodeURIComponent(extractedSong);
    searchParam = encodeURIComponent(searchParam);

    const url1 = "https://api.music.apple.com/v1/catalog/us/search?term=" + extractedSong + "&limit=25&types=songs";
    const url2 = "https://api.music.apple.com/v1/catalog/us/search?term=" + searchParam + "&limit=25&types=songs";

    new Promise((resolve, reject) => {
        apiSearchHelper(url1, url2, resolve, reject, artist, song, 1);
    })
        .then((result) => {
            resolve(result);
        }).catch((error) => {
        console.log(error);
    });
}


export function apiSearchHelper(url: string, url2: string | null, resolve: ResolveFunction, reject: RejectFunction, artist: string, song: string, delay: number) {
    const data = {};
    axios.get(url, {
        headers: apple_auth.getHeader()
    }).then((res) => {
        const response = res.data;
        const status = response.status;
        if (status !== 200) {
            if (delay > 10000) {
                return;
            }
            if (status === 429) {
                console.log(response.message);
                delay = delay * 2;
                console.log("retrying after seconds: " + delay);
                setTimeout(() => {
                    console.log("Calling recursive function");
                    apiSearchHelper(url, url2, resolve, reject, artist, song, delay);
                }, delay * 1000);
            }

            if (status === 400) {
                console.log("We got a 400 because of " + song + " by " + artist);
                resolve({ id: `We could not find ${song} by ${artist}` });
            }

            return;
        }
        let added = false;
        if (response.results.songs !== undefined) {
            for (let i = 0; i < response.results.songs.data.length; i++) {
                if (artistExists(artist, splitArtists(response.results.songs.data[i].attributes.artistName))) {
                    // @ts-expect-error come back to
                    data.id = response.results.songs.data[i].id;
                    // @ts-expect-error come back to
                    data.type = "songs";
                    resolve(data);
                    added = true;
                    break;
                }
            }
        }

        if (added) {
            return;
        }

        if (url2 !== null) {
            axios.get(url2, {
                headers: apple_auth.getHeader()
            }).then((res) => {
                const status = res.status;
                const response = res.data;

                if (status !== 200) {
                    if (delay > 10000) {
                        return;
                    }

                    console.log("Tried URL Two, URL One did not work");
                    if (status === 429) {
                        console.log(response.message);
                        console.log("we got in the after 429");
                        console.log("retrying after milliseconds: " + delay);
                        delay = delay * 2;
                        setTimeout(() => {
                            apiSearchHelper(url, url2, resolve, reject, artist, song, delay);
                        }, delay * 1000);
                    }

                    if (status === 400) {
                        console.log("We got a 400 because of " + song + " by " + artist);
                        resolve({ id: `We could not find ${song} by ${artist}` });
                    }

                    return;
                }
                let added = false;
                if (response.results.songs !== undefined) {
                    for (let i = 0; i < response.results.songs.data.length; i++) {
                        if (artistExists(artist, splitArtists(response.results.songs.data[i].attributes.artistName))) {
                            // @ts-expect-error come back to
                            data.id = response.results.songs.data[i].id;
                            // @ts-expect-error come back to
                            data.type = "songs";
                            added = true;
                            resolve(data);
                            break;
                        }
                    }
                }

                if (!added) {
                    resolve({ id: `We could not find ${song} by ${artist}` });
                }
            }).catch((error) => {
                console.log("Error", error);
                if (delay > 10000) {
                    return;
                }

                delay = delay * 2;
                setTimeout(() => {
                    apiSearchHelper(url, url2, resolve, reject, artist, song, delay);
                }, delay * 1000);
            });
        }
    }).catch((error) => {
        console.log("Error", error);
        if (delay > 10000) {
            return;
        }

        delay = delay * 2;
        setTimeout(() => {
            apiSearchHelper(url, null, resolve, reject, artist, song, delay);
        }, delay * 1000);
    });
}

// @ts-expect-error come back to
export function createPlaylistsInAppleLib(thePlayList, currentIndexBeingProcessed: number, totalToProcess: number) {
    // @ts-expect-error come back to
    const validIDs = [];
    // @ts-expect-error come back to
    const invalidSongs = [];
    // @ts-expect-error come back to
    thePlayList.tracks.forEach((t) => {
        if (t.id.includes("We could not find")) {
            invalidSongs.push(t.id.toString().substring(18));
        } else {
            validIDs.push(t);
        }
    });

    const data = {
        "attributes": {
            "name": thePlayList.name,
            "description": "..."
        },
        "relationships": {
            "tracks": {
                // @ts-expect-error come back to
                "data": validIDs
            }
        }
    };

    fetch("https://api.music.apple.com/v1/me/library/playlists", {
        headers: apple_auth.getHeader(),
        method: "POST",
        body: JSON.stringify(data),
        mode: "cors"
    }).then((response) => {
        const res = response.json();
        const status = response.status;

        res.then((response) => {
            if (status !== 201) {
                console.log(status);
                console.log(response.error);
                console.error("Failed to create playlist");
                return;
            }

            //Update our not added list
            if (invalidSongs.length !== 0) {
                // @ts-expect-error come back to
                store.dispatch(transferFinished([{ name: thePlayList.name, tracks: invalidSongs }]));
            }

            if (currentIndexBeingProcessed === totalToProcess - 1) {
                store.dispatch(transferFinished(true));

            }
        });
    }).catch((error) => {
        console.log(error);
    });
}

export function extractSongNameVerbose(str: string) {
    // remove (outro)
    // feat
    if (str.includes("(feat. ")) {
        return str.substring(0, str.indexOf("(feat. "));
    }
    if (str.includes("(Outro")) {
        return str.substring(0, str.indexOf("(Outro"));
    }
    if (str.includes("- Outro")) {
        return str.substring(0, str.indexOf("- Outro"));
    }
    if (str.includes("- Single")) {
        return str.substring(0, str.indexOf("- Single"));
    }
    if (str.includes("(Single")) {
        return str.substring(0, str.indexOf("(Single"));
    }

    // add curse words
    if (str.includes("f**k")) {
        str.replace("f**k", "fuck");
    }
    if (str[str.length - 1] === " ") {
        return (str.substring(0, str.length - 1));
    }
    return str;
}

export function artistExists(artist: string, songArtist: string[]) {
    const arr = songArtist.map((artist) => {
        return artist.toLowerCase();
    });
    return arr.indexOf(artist.toLowerCase()) > -1;
}

export function splitArtists(artists: string) {
    const seperatedArtists = [];
    const firstSplit = artists.split(", ");
    for (let i = 0; i < firstSplit.length; i++) {
        const secondSplit = firstSplit[i].split(" & ");
        if (secondSplit.length < 2) {
            seperatedArtists.push(secondSplit[0]);
        }
        else {
            // separate by &
            secondSplit.forEach(
                (e) => {
                    seperatedArtists.push(e);
                }
            );
        }
    }
    return seperatedArtists;
}


export async function getAppleMusicPlaylists(): Promise<void> {
    const allPlaylists: ApplePlaylist[] = [];
    let nextPageUrl: string | undefined = "https://api.music.apple.com/v1/me/library/playlists";

    try {
        while (nextPageUrl) {
            const response: AxiosResponse<ApplePlaylistsResponse> = await axios.get(
                nextPageUrl,
                {
                    headers: getHeader()
                }
            );

            allPlaylists.push(...response.data.data);
            nextPageUrl = response.data.next ?
                `https://api.music.apple.com${response.data.next}` :
                undefined;
        }

        store.dispatch(setPlaylists(allPlaylists));
    } catch (error) {
        console.error("Error fetching Apple Music playlists:", error);
        throw error;
    }
}