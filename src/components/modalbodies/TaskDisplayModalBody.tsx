import { useSelector } from "react-redux";
import { BoardTask } from "../../models/Board";
import CheckboxInput from "../CheckboxInput";
import { RootState } from "../../store";
import { useAppDispatch } from "../../hooks/useRedux";
import { updateColumn, updateTask } from "../../features/boards/editBoardFunctions";
import IconButton from "../IconButton";
import { closeModal, openModal } from "../../features/modal/modalSlice";
import { useState } from "react";

// interface TaskDisplayModalBodyInterface {
//     task: BoardTask
// }

function TaskDisplayModalBody(/*{ task }: TaskDisplayModalBodyInterface*/) {
    const dispatch = useAppDispatch();

    const boardIndex = useSelector((state: RootState) => state.currentBoard);
    const columnIndex = useSelector((state: RootState) => state.currentColumn);
    const taskIndex = useSelector((state: RootState) => state.currentTask);
    const board = useSelector((state: RootState) => state.boards[boardIndex]);
    const task = board.columns[columnIndex].tasks[taskIndex];

    const [delButtonFocused, setDelButtonFocused] = useState(false);

    const onUpdateSubtask = (index: number, done: boolean) => {
        dispatch(updateTask(boardIndex, board, columnIndex, taskIndex, {
            ...task,
            subtasks: task.subtasks.map((subtask, i) => {
                if (index === i) return { ...subtask, done: done };
                return subtask;
            })
        }));
    };

    const onDeleteTask = () => {
        setDelButtonFocused(true);
    };

    const actuallyDeleteTask = () => {
        setDelButtonFocused(false);
        dispatch(closeModal());
        dispatch(updateColumn(boardIndex, board, columnIndex, {
            ...board.columns[columnIndex],
            tasks: board.columns[columnIndex].tasks.filter((_, i) => i !== taskIndex)
        }));
    };

    return (
        <div className='flex flex-col'>
            {task.description ? <div className='text-gray-300 -mt-4 mb-2'>
                {task.description}
            </div> : null}

            <div>
                {task.subtasks.length === 0 ? <div className='-my-2 text-gray-300'>No subtasks</div> :
                    <div className='mt-2 text-gray-300 border-b-2 border-slate-400'>
                        Subtasks {task.subtasks.filter(v => v.done).length} of {task.subtasks.length}
                    </div>}

                <div className='flex flex-col'>
                    {task.subtasks.map((subtask, i) =>
                        <div key={i} className='w-full rounded-md bg-slate-700 my-1 py-1 cursor-pointer'
                            onClick={() => onUpdateSubtask(i, !subtask.done)}>
                            <CheckboxInput
                                checked={subtask.done}
                                label={subtask.name}
                                id={`task_${i}`}
                                onChange={(v) => onUpdateSubtask(i, v)} />
                        </div>)}
                </div>
            </div>

            <div className={`flex flex-row mt-8 -mb-4 ${delButtonFocused ? 'bg-red-700 border-2 border-white' : 'bg-red-500'} p-2 rounded-lg cursor-pointer`}
                onClick={delButtonFocused ? actuallyDeleteTask : onDeleteTask}>
                {delButtonFocused ? 'Click again to permanently delete' : 'Delete Task'}
                <IconButton type='trash' />
            </div>
        </div>
    );
}

export default TaskDisplayModalBody;