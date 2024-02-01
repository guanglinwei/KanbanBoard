import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

const currentBoardSlice = createSlice({
    name: 'currentBoard',
    initialState,
    reducers: {
        currentBoardChanged(state, action) {
            state = action.payload;
            return state;
        }
    }
});

export const { currentBoardChanged } = currentBoardSlice.actions;

export default currentBoardSlice.reducer;