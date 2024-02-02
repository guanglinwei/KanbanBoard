import { useSelector } from "react-redux";
import { boardUpdated } from "../../features/boards/boardsSlice";
import { useAppDispatch } from "../../hooks/useRedux";
import { BoardTask } from "../../models/Board";
import TextInput from "../TextInput";
import { RootState } from "../../store";
import { updateTask } from "../../features/boards/editBoardFunctions";
import IconButton from "../IconButton";
import { closeModal } from "../../features/modal/modalSlice";

interface ConfirmationModalBodyInterface {
    text: string;
    confirmButtonClassName?: string;
    callback: () => void;
}

function ConfirmationModalBody({ text, confirmButtonClassName, callback }: ConfirmationModalBodyInterface) {
    const dispatch = useAppDispatch();

    console.log(text)

    return (
        <div className='flex flex-col'>
            <div>
                {text}
            </div>
            <div className='flex flex-row'>
                <div className={'cursor-pointer ' + confirmButtonClassName || ''} onClick={callback}>
                    Yes
                </div>
                <div className='cursor-pointer' onClick={() => dispatch(closeModal())}>
                    Cancel
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModalBody;