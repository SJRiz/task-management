import { TaskItem } from "./TaskItem"

export function TaskList({ tasks, editTask }) {
    return (
        <div>
            <p>Tasks</p>
            <ul>
                {tasks.map(task => {
                return (
                    <TaskItem
                    task={task}
                    key={task.id}
                    editTask={editTask}/>
                )
                })}
            </ul>
        </div>
    )
}