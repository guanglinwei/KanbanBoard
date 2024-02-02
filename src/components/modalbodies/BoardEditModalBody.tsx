import { useSelector } from "react-redux";
import { boardDeleted, boardUpdated } from "../../features/boards/boardsSlice";
import { useAppDispatch } from "../../hooks/useRedux";
import TextInput from "../TextInput";
import { RootState } from "../../store";
import IconButton from "../IconButton";
import { useState } from "react";
import { closeModal } from "../../features/modal/modalSlice";
import { currentBoardChanged } from "../../features/boards/currentBoardSlice";
import { updateColumn } from "../../features/boards/editBoardFunctions";

function BoardEditModalBody() {
    const boardIndex = useSelector((state: RootState) => state.currentBoard);
    const board = useSelector((state: RootState) => state.boards[boardIndex]);

    const [columnSelectedForDeletion, setColumnSelectedForDeletion] = useState(-1);
    const [delButtonFocused, setDelButtonFocused] = useState(false);


    const dispatch = useAppDispatch();

    const onBoardTitleChanged = (newTitle: string) => {
        dispatch(boardUpdated({
            index: boardIndex,
            newBoard: {
                ...board,
                name: newTitle
            }
        }))
    };

    const onDeleteColumn = (index: number) => {
        setColumnSelectedForDeletion(index);
    };

    const actuallyDeleteColumn = (index: number) => {
        setColumnSelectedForDeletion(-1);
        dispatch(boardUpdated({
            index: boardIndex,
            newBoard: {
                ...board,
                columns: board.columns.map((col, i) => {
                    return {
                        ...col,
                        tasks: col.tasks.map((task) => {
                            return {
                                ...task,
                                parentColumn: i < index ? i : i - 1
                            };
                        })
                    };
                }).filter((_, i) => index !== i)
            }
        }));
    };

    const onDeleteBoard = () => {
        setDelButtonFocused(true);
    };

    const actuallyDeleteBoard = () => {
        dispatch(closeModal());
        setDelButtonFocused(false);
        const toDelete = boardIndex;
        dispatch(currentBoardChanged(Math.max(0, toDelete - 1)));
        dispatch(boardDeleted(toDelete));
    };

    const onAddColumn = () => {
        dispatch(boardUpdated({
            index: boardIndex,
            newBoard: {
                ...board,
                columns: [...board.columns, { name: 'New column', color: '0', tasks: [] }]
            }
        }));
    };

    const onColumnChanged = (index: number, text: string) => {
        dispatch(updateColumn(boardIndex, board, index, {
            name: text
        }));
    };

    const onMoveColumn = (index: number, up: boolean) => {
        if (columnSelectedForDeletion !== -1) return;

        const targetIndex = up ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= board.columns.length) return;

        dispatch(boardUpdated({
            index: boardIndex,
            newBoard: {
                ...board,
                columns: board.columns.map((col, i) => {
                    if (i === index) return board.columns[targetIndex];
                    if (i === targetIndex) return board.columns[index];
                    return col;
                })
            }
        }));
    };

    return (
        <div className='flex flex-col'>
            <TextInput id='boardname' value={board.name} label={'Board Title '} onChange={onBoardTitleChanged} />
            <div className='mt-4 text-gray-300 border-b-2 border-slate-400'>
                Columns
            </div>
            <div className='flex flex-col bg-slate-700 p-4 my-2 rounded-lg'>
                {board.columns.map((col, i) =>
                    <div key={i} className='flex flex-row my-2 select-none'>
                        <span className='flex flex-col'>
                            <IconButton small type='up' onClick={() => onMoveColumn(i, true)} />
                            <IconButton small type='down' onClick={() => onMoveColumn(i, false)} />
                        </span>
                        <span className='mr-2'>
                            <TextInput id={'col_' + i}
                                className='inline-block mr-1'
                                value={col.name}
                                onChange={(v) => onColumnChanged(i, v)} />
                            ({col.tasks.length})</span>
                        <IconButton className={columnSelectedForDeletion === i ? 'bg-red-500 rounded-md' : ''}
                            type='trash'
                            onClick={() => (columnSelectedForDeletion === i ? actuallyDeleteColumn : onDeleteColumn)(i)} />
                        {columnSelectedForDeletion === i && <span className='ml-2'>Click again to permanently delete</span>}
                    </div>)}

                <div className='flex flex-row mt-2 p-2 bg-blue-500 rounded-lg text-center cursor-pointer select-none'
                    onClick={onAddColumn}>
                    <IconButton type='plus' />
                    <span className='ml-2'>
                        Add a column
                    </span>
                </div>
            </div>

            <div className={`flex flex-row mt-8 -mb-4 ${delButtonFocused ? 'bg-red-700 border-2 border-white' : 'bg-red-500'} p-2 rounded-lg cursor-pointer`}
                onClick={delButtonFocused ? actuallyDeleteBoard : onDeleteBoard}>
                {delButtonFocused ? 'Click again to permanently delete' : 'Delete Board'}
                <IconButton type='trash' />
            </div>
        </div>
    );
}

export default BoardEditModalBody;