import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useAppDispatch } from "../hooks/useRedux";
import { boardUpdated } from "../features/boards/boardsSlice";
import TaskDisplay from "./TaskDisplay";
import IconButton from "./IconButton";

function BoardDisplay() {
    const boardIndex = useSelector((state: RootState) => state.currentBoard);
    const board = useSelector((state: RootState) => state.boards[boardIndex]);

    const dispatch = useAppDispatch();

    const onAddTask = (columnIndex: number) => {
        dispatch(boardUpdated({
            index: boardIndex,
            newBoard: {
                ...board,
                columns: board.columns.map((col, i) => {
                    if (i !== columnIndex) return col;

                    return {
                        ...col,
                        tasks: [...col.tasks, {
                            name: 'New task',
                            subtasks: [],
                            parentColumn: columnIndex
                        }]
                    }
                })
            }
        }));
    };

    return (
        <div className='bg-slate-800 border-gray-200 text-gray-50 flex-grow'>
            <div className='flex flex-col'>
                <div className='px-16 py-5 text-xl font-semibold bg-slate-600'>
                    {board.name}
                </div>

                <div className='flex flex-row mx-16 my-8'>
                    {board.columns.map((col, i) =>
                        <div className='flex flex-col mr-8 w-64' key={i}>
                            <div className='flex flex-row items-center border-2 rounded-xl p-2 border-slate-600'>
                                <div className='text-gray-300 cursor-default'>
                                    {col.name} ({col.tasks.length})
                                </div>
                                <div className='flex-grow'></div>
                                <div className='text-right'>
                                    <IconButton type='pencil' onClick={() => { }} />
                                </div>
                                <div className='text-right'>
                                    <IconButton type='plus' onClick={() => { onAddTask(i) }} />
                                </div>
                            </div>
                            {col.tasks.map((task, j) =>
                                <TaskDisplay task={task} key={j} index={j} />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BoardDisplay;