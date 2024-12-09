import { configureStore } from "@reduxjs/toolkit";
import appleReducer from "@/features/apple/apple-reducer";
import spotifyReducer from "@/features/spotify/spotify-reducer";

export default configureStore({
    reducer: {
        apple: appleReducer,
        spotify: spotifyReducer,
    }
});