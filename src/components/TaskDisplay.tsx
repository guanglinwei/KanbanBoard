import { BoardTask } from "../models/Board";
import { useAppDispatch } from "../hooks/useRedux";
import { openModal } from "../features/modal/modalSlice";
import IconButton from "./IconButton";
import { currentColumnChanged } from "../features/boards/currentColumnSlice";
import { currentTaskChanged } from "../features/boards/currentTaskSlice";
import { useDraggable, useDroppable } from "@dnd-kit/core";

interface TaskDisplayInterface {
    task: BoardTask;
    index: number;
}

function TaskDisplay({ task, index }: TaskDisplayInterface) {
    const dispatch = useAppDispatch();

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `draggable_${index}_${task.parentColumn}`,
        data: {
            taskIndex: index,
            colIndex: task.parentColumn
        }
    })

    const onTaskClicked = () => {
        dispatch(currentColumnChanged(task.parentColumn));
        dispatch(currentTaskChanged(index));
        dispatch(openModal({ title: task.name, type: 'TaskDisplayModalBody', props: { task } }))
    };

    return (
        <div {...listeners} {...attributes}
            ref={setNodeRef}
            style={transform ? {transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, zIndex: 10} : undefined}
            
            className='border-2 border-slate-600 my-3 p-2 rounded-xl bg-slate-900 flex flex-row cursor-pointer'
            onClick={onTaskClicked}>
            <div>
                <div className='text-md text-slate-50'>
                    {task.name}
                </div>
                <div className='text-sm text-slate-400'>
                    {task.subtasks.filter(s => s.done).length} of {task.subtasks.length} subtasks done
                </div>
            </div>
            <div className='flex-grow'></div>
            <div className='m-auto'>
                <IconButton type='grip' />
            </div>
        </div>
    );
}

export default TaskDisplay;