import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useAppDispatch } from "../hooks/useRedux";
import { boardUpdated, setBoards } from "../features/boards/boardsSlice";
import IconButton from "./IconButton";
import { openModal } from "../features/modal/modalSlice";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import ColumnDisplay from "./ColumnDisplay";
import { SignIn, SignOut, getBoardsFromDB, uploadBoardsToDB } from '../firebase';
import { auth } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from "react";
import { currentBoardChanged } from "../features/boards/currentBoardSlice";

function BoardDisplay() {
    const [authUser, setAuthUser] = useState<User | null>(null);
    const [boardsDirty, setBoardsDirty] = useState(true);

    const boardIndex = useSelector((state: RootState) => state.currentBoard);
    const board = useSelector((state: RootState) => state.boards[boardIndex]);
    const allBoards = useSelector((state: RootState) => state.boards);

    const sensors = useSensors(useSensor(PointerSensor, {
        // @ts-ignore
        activationConstraint: {
            // delay: 100,
            // tolerance: 0,
            distance: 8
        }
    }));

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setAuthUser(user);
        });
    }, []);

    useEffect(() => {
        if (boardsDirty) return;

        setTimeout(() => {
            setBoardsDirty(true);
        }, 5000);
    }, [boardsDirty]);

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

    const onEditTitle = () => {
        dispatch(openModal({ title: 'Edit Board', type: 'BoardEditModalBody', props: {} }));
    };

    const onDropTask = (event: DragEndEvent) => {
        const from = event.active.data.current?.colIndex;
        const to = event.over?.data.current?.index;
        if (from == null || to == null || from === to) return;
        const taskIndex = event.active.data.current?.taskIndex;
        const taskToMove = board.columns[from].tasks[taskIndex];

        dispatch(boardUpdated({
            index: boardIndex,
            newBoard: {
                ...board,
                columns: board.columns.map((col, i) => {
                    // remove the task from here
                    if (i === from) return {
                        ...col,
                        tasks: col.tasks.filter((_, j) => j !== taskIndex)
                    };

                    if (i === to) return {
                        ...col,
                        tasks: [...col.tasks, {
                            ...taskToMove,
                            parentColumn: to
                        }]
                    };

                    return col;
                })
            }
        }));
    };

    const sendFirebaseData = () => {
        if (!authUser) return;
        if (!boardsDirty) return;

        uploadBoardsToDB(allBoards, authUser).then(() => {
            setBoardsDirty(false);
        }).catch((error) => {
            alert(error);
            setBoardsDirty(true);
        });
    };

    const getFirebaseData = () => {
        if (!authUser) return;

        // console.log('getting data')

        getBoardsFromDB(authUser, (boards) => {
            dispatch(currentBoardChanged(0));
            dispatch(setBoards(boards));
            setBoardsDirty(false);
        }, () => {
            const tasks = allBoards[0].columns.reduce((a, c) => a + c.tasks.length, 0);
            if (allBoards.length === 0 ||
                (allBoards.length === 1 && tasks === 0)) {
                dispatch(setBoards([
                    {
                        name: 'New Board',
                        columns: [
                            { name: 'Todo', color: '0', tasks: [] },
                            { name: 'Doing', color: '1', tasks: [] },
                            { name: 'Done', color: '2', tasks: [] },
                        ]
                    }
                ]));
            } else {
                sendFirebaseData();
            }

            setBoardsDirty(false);
        });
    };

    useEffect(() => {
        if (!authUser) return;
        getFirebaseData();
        // eslint-disable-next-line
    }, [authUser]);

    return (board ?
        <DndContext onDragEnd={onDropTask} sensors={sensors}>
            <div className='bg-slate-800 border-gray-200 text-gray-50 w-11/12 h-full overflow-x-auto'>
                <div className='flex flex-col h-full'>
                    <div className='pl-16 pr-6 py-5 text-xl font-semibold bg-slate-600 flex flex-row'>
                        <span className='mr-2'>
                            {board.name}
                        </span>
                        <IconButton type='pencil' onClick={onEditTitle} />
                        <div className='flex-grow' />
                        {authUser ?
                            <div className='flex flex-row align-middle items-center'>
                                <span>{authUser.displayName}</span>
                                <div onClick={boardsDirty ? sendFirebaseData : (() => {})}
                                    className='cursor-pointer bg-blue-500 px-3 py-1 ml-3 rounded-lg flex flex-row align-middle items-center'>
                                    <span>{boardsDirty ? 'Save boards' : 'Boards saved'}</span>
                                    <IconButton type={boardsDirty ? 'cloud' : 'check'} />
                                </div>
                                <div onClick={SignOut}
                                    className='cursor-pointer bg-blue-500 px-3 py-1 ml-3 rounded-lg flex flex-row align-middle items-center'>
                                    <span>Logout</span>
                                    <IconButton type='logout' />
                                </div>
                            </div>
                            : <div
                                onClick={SignIn}
                                className='cursor-pointer bg-blue-500 px-3 py-1 rounded-lg flex flex-row align-middle items-center'>
                                <span>Login</span>
                                <IconButton type='user' />
                            </div>}

                    </div>

                    {/* PLACEHOLDER TODO
                    <IconButton type='user' onClick={getFirebaseData} /> */}

                    <div className='flex flex-row mx-16 my-8 overflow-x-auto h-full'>
                        {board.columns.map((col, i) =>
                            <ColumnDisplay col={col} i={i} onAddTask={onAddTask} key={i} />
                        )}
                    </div>
                </div>
            </div>
        </DndContext>
        : <div className='bg-slate-800 border-gray-200 text-gray-50 w-11/12 h-full overflow-x-auto text-center'>
            <div className='mt-4 text-lg'>You have no boards. Click "Create a New Board" to make one</div>
        </div>
    )
}

export default BoardDisplay;