import TaskDisplay from "./TaskDisplay";
import IconButton from "./IconButton";
import { BoardColumn } from "../models/Board";
import { useDroppable } from "@dnd-kit/core";

interface ColumnDisplayInterface {
    col: BoardColumn;
    i: number;
    onAddTask: (x: number) => void;
}

function ColumnDisplay({ col, i, onAddTask }: ColumnDisplayInterface) {
    const { isOver, setNodeRef } = useDroppable({
        id: `droppable_col_${i}`,
        data: {
            index: i
        }
    })

    return (
        <div ref={setNodeRef} className={`flex flex-col mr-8 w-64 min-w-fit min-h-full border-2 ${isOver ? 'border-slate-400 rounded-md' : 'border-transparent'}`} key={i}>
            <div className='flex flex-row items-center border-2 rounded-xl p-2 border-slate-600'>
                <div className='text-gray-300 cursor-default'>
                    {col.name} ({col.tasks.length})
                </div>
                <div className='flex-grow'></div>
                <div className='text-right'>
                    <IconButton type='plus' onClick={() => { onAddTask(i) }} />
                </div>
            </div>
            {col.tasks.map((task, j) =>
                <TaskDisplay task={task} key={j} index={j} />
            )}
        </div>
    );
}

export default ColumnDisplay;