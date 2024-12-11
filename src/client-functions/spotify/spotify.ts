import axios, { AxiosResponse } from "axios";

const baseSpotifyAPI = "https://api.spotify.com/v1";


type ResolveFunction = (value: unknown) => void;
type RejectFunction = (error: unknown) => void;

export function getSpotifyPlaylists(tokenJSON: SpotifyTokenJSON) {

    const accessToken = tokenJSON.access_token;
    const getPlaylistURL = baseSpotifyAPI + "/me/playlists?limit=50";
    // var getLikedSongsURL = baseSpotifyAPI + '/me/tracks';

    return Promise.all([
        new Promise((resolve, reject) => {
            getAllDataRecursively(getPlaylistURL, [], resolve, reject, accessToken); //Fetch Playlists
        }),
        // new Promise((resolve, reject) => {
        //     getAllDataRecursively(getLikedSongsURL, [], resolve, reject, accessToken) //Fetch liked song
        // })
    ]);
}


export function getAllDataRecursively(url: string, data: SpotifyPlaylist[], resolve: ResolveFunction, reject: RejectFunction, accessToken: string) {
    axios.get(url, {
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    })
        .then((response) => {
            const retrievedData = data.concat(response.data.items);
            if (response.data.next !== null) {
                getAllDataRecursively(response.data.next, retrievedData, resolve, reject, accessToken);
            }
            else {
                resolve(retrievedData);
            }
        }).catch(error => {
            console.log(error);
            handleErrors(error);
            reject("Something went wrong. Please refresh the page and try again.");
        }
    );
}

function handleErrors(response: AxiosResponse) {
    if (!response || response.status !== 200 || response.statusText !== "OK") {
        if (response.status === 401) {
            console.log(response);

            throw Error(response.statusText);
        }
        return response;
    }

}

export function extractSongName(str: string) {
    if (str.includes("(feat. ")) {
        return str.substring(0, str.indexOf("(feat. "));
    }
    else if (str.includes("(Feat. ")) {
        return str.substring(0, str.indexOf("(Feat. "));
    }
    else if (str.includes("(with ")) {
        return str.substring(0, str.indexOf("(with "));
    }
    return str;
}



export function fetchAllTracksFromGivenPlaylists(listOfPlayListIDs: string[], token: SpotifyTokenJSON) {
    const accessToken = token.access_token;

    const listOfPlayListIDsArray = Array.from(listOfPlayListIDs);
    const getPlaylistURLs = listOfPlayListIDsArray.filter(function(id){
        return id !== "allthelikedsongsid";
    }).map((id) => {
        return baseSpotifyAPI + "/playlists/" + id + "/tracks?limit=50";
    });

    const playlistPromises = getPlaylistURLs.map((url) =>
        new Promise((resolve, reject) => {
            fetchSongsInfosInASinglePlaylistRecursively(url, [], accessToken, resolve, reject);
        }));

    return Promise.all(playlistPromises);
}


export function fetchSongsInfosInASinglePlaylistRecursively(url: string, compiledData: SpotifySongInfo[], accessToken: string, resolve: ResolveFunction, reject: RejectFunction) {
    // console.log(url);
    fetch(url, {
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    })
        .then((response) => response.json())
        .then((response: SpotifyPlaylistTracks) => {
            const newData: SpotifySongInfo[] = [];
            response.items.forEach((data) => {
                if (data.track !== null) {
                    const artists: string[] = [];
                    data.track.artists.forEach((artist) => {
                        artists.push(artist.name);
                    });
                    const albumArtists: string[] = [];
                    data.track.album.artists.forEach((artist) => {
                        albumArtists.push(artist.name);
                    });
                    const cur: SpotifySongInfo = {
                        trackName: extractSongName(data.track.name),
                        artistName: artists,
                        albumName: data.track.album.name,
                        albumArtist: albumArtists,
                    };
                    newData.push(cur);
                }
            });
            const retrievedData = compiledData.concat(newData);
            if (response.next !== null) {
                fetchSongsInfosInASinglePlaylistRecursively(response.next, retrievedData, accessToken, resolve, reject);
            } else {
                const finalRES = {};
                // @ts-expect-error Don't feel like typing
                finalRES[url.split("/")[5]] = retrievedData;
                resolve(finalRES);
            }
        }).catch(error => {
        console.log(error);
        reject("Something went wrong. Please refresh the page and try again.");
    });
}