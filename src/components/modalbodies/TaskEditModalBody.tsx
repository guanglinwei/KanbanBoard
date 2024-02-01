import { useSelector } from "react-redux";
import { boardUpdated } from "../../features/boards/boardsSlice";
import { useAppDispatch } from "../../hooks/useRedux";
import { BoardTask } from "../../models/Board";
import TextInput from "../TextInput";
import { RootState } from "../../store";

interface TaskEditModalBodyInterface {
    task: BoardTask
}
// TODO: move all the board/column/taskUpdated stuff into separate slices
function TaskEditModalBody({ task }: TaskEditModalBodyInterface) {
    const dispatch = useAppDispatch();

    const boardIndex = useSelector((state: RootState) => state.currentBoard);
    const columnIndex = useSelector((state: RootState) => state.currentColumn);
    const taskIndex = useSelector((state: RootState) => state.currentTask);
    const board = useSelector((state: RootState) => state.boards[boardIndex]);

    // TODO: Have this on close instead
    const onTaskNameChanged = (newName: string) => {
        dispatch(boardUpdated({
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
                                name: newName
                            };
                        })
                    };
                })
            }
        }));
    };
    
    return (
        <div className='flex flex-col'>
            <TextInput value={task.name} label={'Task name'} onChange={onTaskNameChanged} />
            {task.description ? <div className='text-gray-300'>
                {task.description}
            </div> : null}

            hello
        </div>
    );
}

export default TaskEditModalBody;