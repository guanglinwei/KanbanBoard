import { useSelector } from "react-redux";
import { boardUpdated } from "../../features/boards/boardsSlice";
import { useAppDispatch } from "../../hooks/useRedux";
import { BoardTask } from "../../models/Board";
import TextInput from "../TextInput";
import { RootState } from "../../store";
import { updateTask } from "../../features/boards/editBoardFunctions";
import IconButton from "../IconButton";

// interface TaskEditModalBodyInterface {
//     task: BoardTask
// }
function TaskEditModalBody(/*{ task }: TaskEditModalBodyInterface*/) {
    const boardIndex = useSelector((state: RootState) => state.currentBoard);
    const columnIndex = useSelector((state: RootState) => state.currentColumn);
    const taskIndex = useSelector((state: RootState) => state.currentTask);
    const board = useSelector((state: RootState) => state.boards[boardIndex]);
    const task = board.columns[columnIndex].tasks[taskIndex];

    const dispatch = useAppDispatch();

    const onTaskNameChanged = (newName: string) => {
        dispatch(updateTask(boardIndex, board, columnIndex, taskIndex, {
            name: newName
        }));
    };

    const onTaskDescriptionChanged = (newDesc: string) => {
        dispatch(updateTask(boardIndex, board, columnIndex, taskIndex, {
            description: newDesc
        }));
    };

    const onSubtaskAdded = () => {
        dispatch(updateTask(boardIndex, board, columnIndex, taskIndex, {
            ...task,
            subtasks: [
                ...task.subtasks,
                { name: 'New subtask', done: false }
            ]
        }));
    };

    const onSubtaskDeleted = (index: number) => {
        dispatch(updateTask(boardIndex, board, columnIndex, taskIndex, {
            ...task,
            subtasks: task.subtasks.filter((_, i) => i !== index)
        }));
    };

    const onSubtaskUpdated = (index: number, value: string) => {
        dispatch(updateTask(boardIndex, board, columnIndex, taskIndex, {
            ...task,
            subtasks: task.subtasks.map((subtask, i) => {
                if (index === i) return { ...subtask, name: value };
                return subtask;
            })
        }));
    }

    return (
        <div className='flex flex-col'>
            <TextInput id='taskname' value={task.name} label={'Task name '} onChange={onTaskNameChanged} />
            <TextInput id='taskdesc' className={'mt-2'} value={task.description || ''} label={'Description'} 
                onChange={onTaskDescriptionChanged} labelOnNewLine large />
            <div className='mt-4 text-gray-300 border-b-2 border-slate-400'>
                Subtasks
            </div>
            <div className='flex flex-col bg-slate-700 p-4 my-2 rounded-lg'>
                {task.subtasks.map((subtask, i) =>
                    <div key={i} className='flex flex-row'>
                        <TextInput
                            id={`${task.name}_subtask_${subtask.name}`}
                            value={subtask.name}
                            className='mb-2'
                            onChange={(v) => onSubtaskUpdated(i, v)}
                        />
                        <IconButton type='trash' onClick={() => onSubtaskDeleted(i)} />
                    </div>)}

                <div className='flex flex-row p-2 bg-blue-500 rounded-lg text-center cursor-pointer select-none'
                    onClick={onSubtaskAdded}>
                    <IconButton type='plus' />
                    <span className='ml-2'>
                        Add a subtask
                    </span>
                </div>
            </div>
        </div>
    );
}

export default TaskEditModalBody;