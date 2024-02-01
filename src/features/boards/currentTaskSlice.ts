import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

const currentTaskSlice = createSlice({
    name: 'currentTask',
    initialState,
    reducers: {
        currentTaskChanged(state, action) {
            state = action.payload;
            return state;
        }
    }
});

export const { currentTaskChanged } = currentTaskSlice.actions;

export default currentTaskSlice.reducer;