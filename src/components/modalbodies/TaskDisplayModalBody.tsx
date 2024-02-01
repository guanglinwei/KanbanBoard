import { BoardTask } from "../../models/Board";

interface TaskDisplayModalBodyInterface {
    task: BoardTask
}

function TaskDisplayModalBody({ task }: TaskDisplayModalBodyInterface) {
    const onTaskNameChanged = () => {

    };
    
    return (
        <div className='flex flex-col'>
            <div className=''>
                {task.name}
            </div>
            {task.description ? <div className='text-gray-300'>
                {task.description}
            </div> : null}

            hello
        </div>
    );
}

export default TaskDisplayModalBody;