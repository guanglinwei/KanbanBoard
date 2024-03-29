export interface BoardTask {
    name: string;
    description?: string;
    subtasks: { name: string, done: boolean; }[];
    parentColumn: number;
}

export interface BoardColumn {
    name: string;
    tasks: BoardTask[];
    color: string;
}

interface Board {
    name: string;
    columns: BoardColumn[];
}

export default Board;