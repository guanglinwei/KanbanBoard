import { createSlice } from "@reduxjs/toolkit";
import Board from "../../models/Board";

export const initialState: Board[] = [
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
        },
        boardDeleted(state, action) {
            return state.filter((_, i) => i !== action.payload);
        },
        setBoards(state, action) {
            state = action.payload;
            return state;
        }
    }
});

export const { boardAdded, boardUpdated, boardDeleted, setBoards } = boardsSlice.actions;

export default boardsSlice.reducer;