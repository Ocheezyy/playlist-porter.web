import { createSlice, PayloadAction, SliceCaseReducers, SliceSelectors } from "@reduxjs/toolkit";

const appleSlice = createSlice<
    AppleSliceState, SliceCaseReducers<AppleSliceState>, string, SliceSelectors<AppleSliceState>, string
>({
    name: "apple",
    initialState: {
        playlists: [],
        songsNotFound: [],
        transferDone: false,
        currentPlaylist: "",
        currentSong: ""
    },
    reducers: {
        setPlaylists: (state, action: PayloadAction<ApplePlaylist[]>) => {
            state.playlists = action.payload;
        },
        songNotFound: (state, action: PayloadAction<string>) => {
            state.songsNotFound = [...state.songsNotFound, action.payload];
        },
        transferFinished: (state, action: PayloadAction<boolean>) => {
            state.transferDone = action.payload;
        },
        updateCurrentPlaylist: (state, action: PayloadAction<string>) => {
            state.currentPlaylist = action.payload;
        },
        updateCurrentSong: (state, action: PayloadAction<string>) => {
            state.currentSong = action.payload;
        }
    }
});

export const { songNotFound, transferFinished, updateCurrentPlaylist, updateCurrentSong, setPlaylists } = appleSlice.actions;

export default appleSlice.reducer;