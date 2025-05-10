export function TaskItem({ task, editTask }){
    return (
        <li>
            <div>
            <p>{task.taskDesc} - {task.id}</p>
            <button onClick={() => editTask(task)}>Delete</button>
            <button onClick={() => editTask(task)}>Edit</button>
            </div>
        </li>
    )
}