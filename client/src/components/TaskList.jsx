import { TaskItem } from "./TaskItem"

export function TaskList({ tasks, editTask }) {
    return (
        <div>
            <h2><u>Tasks</u></h2>
            { tasks.length > 0 ?
            (<ul>
                {tasks.map(task => {
                // Load each task in the list using a map
                return (
                    <TaskItem
                    task={task}
                    key={task.id}
                    editTask={editTask}/>
                )
                })}
            </ul>) :
            (<p>No tasks</p>)
            }
        </div>
    )
}