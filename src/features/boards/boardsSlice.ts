import { createSlice } from "@reduxjs/toolkit";
import Board from "../../models/Board";

const initialState: Board[] = [
    {
        name: 'New Board',
        columns: [
            { name: 'Todo', color: '0', tasks: [] },
            { name: 'Doing', color: '1', tasks: [] },
            { name: 'Done', color: '2', tasks: [] },
        ]
    }
];

const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        boardAdded(state, action) {
            state.push(action.payload);
        },
        boardUpdated(state, action) {
            const { index, newBoard } = action.payload;
            state[index] = newBoard;
        }
    }
});

export const { boardAdded, boardUpdated } = boardsSlice.actions;

export default boardsSlice.reducer;