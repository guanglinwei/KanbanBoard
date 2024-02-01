import { BoardTask } from "../models/Board";
import { useAppDispatch } from "../hooks/useRedux";
import { openModal } from "../features/modal/modalSlice";
import IconButton from "./IconButton";
import { currentColumnChanged } from "../features/boards/currentColumnSlice";
import { currentTaskChanged } from "../features/boards/currentTaskSlice";

interface TaskDisplayInterface {
    task: BoardTask;
    index: number;
}

function TaskDisplay({ task, index }: TaskDisplayInterface) {
    const dispatch = useAppDispatch();

    const onTaskClicked = () => {
        dispatch(currentColumnChanged(task.parentColumn));
        dispatch(currentTaskChanged(index));
        dispatch(openModal({ title: 'Edit a Task', type: 'TaskEditModalBody', props: { task } }))
    };

    return (
        <div className='border-2 border-slate-600 my-3 p-2 rounded-xl bg-slate-900 flex flex-row'>
                <div>
            <div className='text-md text-slate-50'>
                {task.name}
            </div>
            <div className='text-sm text-slate-400'>
                {task.subtasks.filter(s => s.done).length} of {task.subtasks.length} subtasks done
            </div>
            </div>
            <div className='flex-grow'></div>
            <div className=''>
                <IconButton type='pencil' onClick={onTaskClicked} />
            </div>
        </div>
    );
}

export default TaskDisplay;