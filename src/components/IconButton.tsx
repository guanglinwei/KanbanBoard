import { FaArrowRightFromBracket, FaCheck, FaCircleUser, FaCloud, FaEllipsisVertical, FaGripVertical, FaPencil, FaPlus, FaSortDown, FaSortUp, FaTrash } from "react-icons/fa6";

interface IconButtonInterface {
    type: 'pencil' | 'plus' | 'trash' | 'kebab' | 'up' | 'down' | 'grip' | 'user' | 'logout' | 'cloud' | 'check' ;
    onClick?: () => void;
    className?: string;
    small?: boolean;
}

function IconButton({ type, onClick, className, small }: IconButtonInterface) {
    const Icon = {
        pencil: FaPencil,
        plus: FaPlus,
        trash: FaTrash,
        kebab: FaEllipsisVertical,
        up: FaSortUp,
        down: FaSortDown,
        grip: FaGripVertical,
        user: FaCircleUser,
        logout: FaArrowRightFromBracket,
        cloud: FaCloud,
        check: FaCheck,
    }[type];

    return (
        <Icon className={'cursor-pointer p-1 w-6 h-6 ' + (className || '') + (small ? ' p-0 w-4 h-4 -mb-2' : '')} onClick={onClick}/>
    );
}

export default IconButton;