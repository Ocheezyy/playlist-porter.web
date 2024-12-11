import { createSlice, PayloadAction, SliceCaseReducers, SliceSelectors } from "@reduxjs/toolkit";

const spotifySlice = createSlice<
    SpotifySliceState, SliceCaseReducers<SpotifySliceState>, string, SliceSelectors<SpotifySliceState>, string
>({
    name: "spotify",
    initialState: {
        accessToken: "",
        playlists: [],
        transfer: [],
        loaded: false,
        likedSongData: [],
        tempMap: {},
        transferReady: false
    },
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        updatePlaylist: (state, action: PayloadAction<SpotifyUpdatePlaylistAction>) => {
            state.playlists = action.payload.playlists;
            state.likedSongData = action.payload.likedSongData;
            state.tempMap = action.payload.tempMap;
            state.loaded = true;
        },
        transfer: (state, action: PayloadAction<any[]>) => {
            state.transfer = action.payload;
            state.transferReady  = true;
        }
    }
});


export const { setToken, updatePlaylist, transfer } = spotifySlice.actions;

export default spotifySlice.reducer;