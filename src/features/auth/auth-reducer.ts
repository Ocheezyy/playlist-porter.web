import { createSlice, PayloadAction, SliceCaseReducers, SliceSelectors } from "@reduxjs/toolkit";

const authSlice = createSlice<
    AuthSliceState, SliceCaseReducers<AuthSliceState>, string, SliceSelectors<AuthSliceState>, string
>({
    name: "apple",
    initialState: {
        clerkToken: ""
    },
    reducers: {
        setClerkToken(state, action: PayloadAction<string | null>) {
            if (action.payload) state.clerkToken = action.payload;
        }
    }
});

export const { setClerkToken } = authSlice.actions;

export default authSlice.reducer;