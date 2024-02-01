import { FaPencil, FaPlus, FaTrash } from "react-icons/fa6";

interface IconButtonInterface {
    type: 'pencil' | 'plus' | 'trash';
    onClick?: () => void;
}

function IconButton({ type, onClick }: IconButtonInterface) {
    const Icon = {
        pencil: FaPencil,
        plus: FaPlus,
        trash: FaTrash
    }[type];

    return (
        <Icon className='cursor-pointer p-1 w-6 h-6' onClick={onClick}/>
    );
}

export default IconButton;