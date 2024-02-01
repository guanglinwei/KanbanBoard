import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

const currentColumnSlice = createSlice({
    name: 'currentColumn',
    initialState,
    reducers: {
        currentColumnChanged(state, action) {
            state = action.payload;
            return state;
        }
    }
});

export const { currentColumnChanged } = currentColumnSlice.actions;

export default currentColumnSlice.reducer;