import { configureStore } from "@reduxjs/toolkit";
import appleReducer from "@/features/apple/apple-reducer";
import spotifyReducer from "@/features/spotify/spotify-reducer";
import authReducer from "@/features/auth/auth-reducer";

const store = configureStore({
    reducer: {
        apple: appleReducer,
        spotify: spotifyReducer,
        auth: authReducer
    }
});

export default store;

export type ReduxState = ReturnType<typeof store.getState>;