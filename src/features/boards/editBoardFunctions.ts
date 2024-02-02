import { boardUpdated } from "./boardsSlice";
import Board, { BoardColumn, BoardTask } from "../../models/Board";

export const updateColumn = (boardIndex: number, board: Board, columnIndex: number, newColumn: Partial<BoardColumn>) => {
    return (boardUpdated({
        index: boardIndex,
        newBoard: {
            ...board,
            columns: board.columns.map((col, i) => {
                if (i !== columnIndex) return col;
                return {
                    ...col,
                    ...newColumn
                };
            })
        }
    }));
};

export const updateTask = (boardIndex: number, board: Board, columnIndex: number, taskIndex: number, newTask: Partial<BoardTask>) => {
    return (boardUpdated({
        index: boardIndex,
        newBoard: {
            ...board,
            columns: board.columns.map((col, i) => {
                if (i !== columnIndex) return col;
                return {
                    ...col,
                    tasks: col.tasks.map((task, j) => {
                        if (j !== taskIndex) return task;
                        return {
                            ...task,
                            ...newTask
                        };
                    })
                };
            })
        }
    }));
};