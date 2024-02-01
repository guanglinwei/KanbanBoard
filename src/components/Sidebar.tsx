import { nanoid } from "@reduxjs/toolkit";
import { boardAdded } from "../features/boards/boardsSlice";
import { currentBoardChanged } from "../features/boards/currentBoardSlice";
import Board from "../models/Board";
import IconWithText from "./IconWithText";
import { FaBook, FaNoteSticky, FaPlus } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../store";

function Sidebar() {
    const boards: Board[] = useSelector((state: RootState) => state.boards);
    const currentBoard = useSelector((state: RootState) => state.currentBoard);

    const dispatch = useDispatch();

    const onAddBoard = () => {
        const newBoard: Board = {
            name: 'New Board',
            columns: [
                { name: 'Todo', color: '0', tasks: [] },
                { name: 'Doing', color: '1', tasks: [] },
                { name: 'Done', color: '2', tasks: [] },
            ]
        };

        dispatch(
            boardAdded({
                id: nanoid(),
                ...newBoard
            })
        );
    };

    const onChangeSelectedBoard = (index: number) => {
        if (currentBoard === index) return;
        dispatch(currentBoardChanged(index));
    };

    return (
        <div className='top-0 left-0 bottom-0 w-72 h-screen bg-slate-600 border-r-2 border-gray-200 text-gray-50'>
            <div className='flex flex-col'>
                <div className='m-3'>
                    <IconWithText
                        text={'Kanban Demo App'}
                        icon={(s) => <FaBook className={s} />}
                        additionalTextStyles='text-lg' />
                </div>

                <div className='mx-6 my-5 border-b-2 border-slate-300'>
                    All boards &#40;{boards.length}&#41;
                </div>
                {boards.map((board, i) =>
                    <div className={`m-3 cursor-pointer ${i === currentBoard ? 'bg-blue-600 rounded-lg' : ''}`} key={i}
                        onClick={() => onChangeSelectedBoard(i)}>
                        <IconWithText
                            text={board.name}
                            icon={(s) => <FaNoteSticky className={s} />}
                        />
                    </div>
                )}

                <div className='m-3'>
                    <div
                        className='bg-blue-500 bg-opacity-50 p-1 rounded-md cursor-pointer'
                        onClick={() => { onAddBoard() }}>
                        <IconWithText
                            text={'Create New Board'}
                            icon={(s) => <FaPlus className={s} />}
                            smallIcon
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;