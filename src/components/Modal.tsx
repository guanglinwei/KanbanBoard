import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../features/modal/modalSlice";
import { RootState } from "../store";
import TaskEditModalBody from "./modalbodies/TaskEditModalBody";
import { useEffect, useState } from "react";
import TaskDisplayModalBody from "./modalbodies/TaskDisplayModalBody";
import IconButton from "./IconButton";
import { BoardTask } from "../models/Board";
import BoardEditModalBody from "./modalbodies/BoardEditModalBody";
import ConfirmationModalBody from "./modalbodies/ConfirmationModalBody";

export interface ModalProps {
    title: string;
    type: 'TaskEditModalBody' | 'TaskDisplayModalBody' | 'BoardEditModalBody' | 'ConfirmationModalBody' | '' | undefined;
    visible?: boolean;
    props?: any;
}

function Modal() {
    const { title, type, visible, props } = useSelector((state: RootState) => state.modal);

    const dispatch = useDispatch();

    const [nextMouseUpWillCloseModal, setNextMouseUpWillCloseModal] = useState(false);

    const onCloseModal = () => {
        setNextMouseUpWillCloseModal(false);
        dispatch(closeModal());
    };

    const onSwitchModal = (title: string, type: string, task: BoardTask) => {
        dispatch(closeModal());
        dispatch(openModal({ title: title, type: type, props: { task } }))
    };

    let bodyElement = undefined;
    let additionalTitleElement = undefined;
    switch (type) {
        case 'TaskDisplayModalBody':
            bodyElement = <TaskDisplayModalBody {...props} />;
            additionalTitleElement = <IconButton type='pencil' 
                onClick={() => onSwitchModal('Edit a Task', 'TaskEditModalBody', props.task)} />
            break;
        case 'TaskEditModalBody':
            bodyElement = <TaskEditModalBody {...props} />;
            break;
        case 'BoardEditModalBody':
            bodyElement = <BoardEditModalBody {...props} />;
            break;
        case 'ConfirmationModalBody':
            bodyElement = <ConfirmationModalBody {...props} />;
            break;
        default: bodyElement = <></>;
    };

    useEffect(() => {
        const close = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onCloseModal();
            }
        };
        window.addEventListener('keydown', close);

        return () => window.removeEventListener('keydown', close);
    }, []);

    return (<>
        {visible ? (
            <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto bg-black bg-opacity-30 fixed inset-0 z-50 outline-none focus:outline-none'
                onMouseUp={() => nextMouseUpWillCloseModal && onCloseModal()} onMouseDown={() => setNextMouseUpWillCloseModal(true)}>
                <div className="relative w-1/3 my-6 mx-auto max-w-3xl max-h-[90%] overflow-y-auto" 
                    onMouseUp={e => {e.stopPropagation(); setNextMouseUpWillCloseModal(false)}} 
                    onMouseDown={e => {e.stopPropagation(); setNextMouseUpWillCloseModal(false)}} 
                    onClick={e => e.stopPropagation()}>
                    <div className="border-0 rounded-lg shadow-lg relative w-full bg-slate-600 outline-none focus:outline-none text-slate-50">
                        <div className="flex flex-col p-4 max-w-full">
                            <div className='text-lg flex flex-row'>
                                <span className='mr-4'>{title}</span> {additionalTitleElement || null}</div>
                            <div className='mt-8 h-full'>{bodyElement}</div>
                            <button className="bg-blue-500 border-2 border-slate-400 w-16 mt-8 py-1 rounded-md"
                                onClick={() => onCloseModal()}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ) : null}
    </>
    );
}


export default Modal;