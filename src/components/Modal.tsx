import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../features/modal/modalSlice";
import { RootState } from "../store";
import TaskEditModalBody from "./modalbodies/TaskEditModalBody";

export interface ModalProps {
    title: string;
    type: 'TaskEditModalBody' | '' | undefined;
    visible?: boolean;
    props?: any;
}

function Modal() {
    const { title, type, visible, props } = useSelector((state: RootState) => state.modal);

    const dispatch = useDispatch();

    const onCloseModal = () => {
        dispatch(closeModal());
    };

    let bodyElement = undefined;
    switch (type) {
        case 'TaskEditModalBody':
            bodyElement = <TaskEditModalBody {...props}/>
            break;
        default: bodyElement = <></>;
    };

    return (<>
        {visible ? (
            <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto bg-black bg-opacity-30 fixed inset-0 z-50 outline-none focus:outline-none'>
                <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative w-full bg-slate-600 outline-none focus:outline-none text-slate-50">
                        <div className="flex flex-col p-4 max-w-full">
                            <div className='text-lg'>{title}</div>
                            <div className='mt-8'>{bodyElement}</div>
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