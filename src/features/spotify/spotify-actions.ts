import { getSpotifyPlaylists, fetchAllTracksFromGivenPlaylists } from "@/client-functions/spotify/spotify";
import { updatePlaylist, transfer } from "@/features/spotify/spotify-reducer";
// import spotify_default from "../../svg/Spotify-liked-track.jpg";
import store from "@/store";

export function fetchSpotifyPlaylists(spotifyToken: string) {
    return getSpotifyPlaylists(spotifyToken)
        .then((response) => {

            const playlistData: PlaylistData[] = [];
            const likedSongData: LikedSongData[] = [];
            const tempMap: SpotifyTempMap = {};

            //Adding the liked tracks as part of our playlists
            // playlistData.push({
            //   name: 'Liked Songs',
            //   no_of_songs: response[1].length,
            //   playlist_owner: response[0][0].owner.display_name,
            //   image: spotify_default,
            //   id: 'allthelikedsongsid',
            //   isChecked: false,
            // })

            //Parsing playlist for our client side
            // @ts-expect-error response array doesn't need typing
            response[0]
                .forEach((responseItem: SpotifyPlaylist) => {
                const curItem: PlaylistData = {
                    name: responseItem.name,
                    no_of_songs: responseItem.tracks.total,
                    playlist_owner: responseItem.owner.display_name,
                    image: responseItem.images?.[0]?.url || "", // spotify_default,
                    id: responseItem.id,
                    isChecked: false
                };
                playlistData.push(curItem);
                tempMap[responseItem.id] = { name: responseItem.name, description: responseItem.description };
            });


            //Parsing the liked song for future purposes
            // response[1].forEach((song) => {
            //   let curItemSong = {};
            //   //Song parameters
            //   curItemSong["trackName"] = extractSongName(song.track.name);
            //   curItemSong["artistName"] = [];
            //   song.track.artists.forEach((artist) => {
            //     curItemSong["artistName"].push(artist.name)
            //   })
            //   // add album parameters
            //   curItemSong["albumName"] = song.track.album.name
            //   curItemSong["albumArtist"] = []
            //   song.track.album.artists.forEach((artist) => {
            //     curItemSong["albumArtist"].push(artist.name)
            //   })

            //   likedSongData.push(curItemSong)
            // })

            store.dispatch(updatePlaylist({
                playlists: playlistData,
                tempMap: tempMap,
                likedSongData: likedSongData
            }));
        });
};



export function prepareSpotifyDataToBeTransferred(playlistToBeTransferredIDs: string[], tokenJSON: SpotifyTokenJSON) {
    return fetchAllTracksFromGivenPlaylists(playlistToBeTransferredIDs, tokenJSON)
        
        .then((response) => {
            const state = store.getState();
            const playlistToBeTransferred: PlaylistToBeTransferred[] = [];

            // @ts-expect-error need to see response object in console
            if(playlistToBeTransferredIDs.has("allthelikedsongsid")) {
                playlistToBeTransferred.push({ "name": "Liked Songs", "description": "Liked Songs in the playlist", "tracks": state.spotify.likedSongData });
            }

            // var playlistToBeTransferredArray = Array.from(playlistToBeTransferred)
            
            response.forEach((responseItem) => {
                // @ts-expect-error will come back to
                for (const k in responseItem) {
                    const cur: PlaylistToBeTransferred = {
                        name: state.spotify.tempMap[k].name,
                        description: state.spotify.tempMap[k].description,
                        // @ts-expect-error will come back to
                        tracks: responseItem[k]
                    };
                    playlistToBeTransferred.push(cur);
                }
            });

            store.dispatch(transfer(playlistToBeTransferred));
        });

}