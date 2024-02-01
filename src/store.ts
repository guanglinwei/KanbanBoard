import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from './features/boards/boardsSlice';
import currentBoardReducer from './features/boards/currentBoardSlice';
import currentColumnReducer from './features/boards/currentColumnSlice';
import currentTaskReducer from './features/boards/currentTaskSlice';
import modalReducer from './features/modal/modalSlice';

export const store = configureStore({
    reducer: {
        boards: boardsReducer,
        currentBoard: currentBoardReducer,
        currentColumn: currentColumnReducer,
        currentTask: currentTaskReducer,
        modal: modalReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;