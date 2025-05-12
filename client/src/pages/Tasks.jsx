import { useState, useEffect } from 'react'
import axios from 'axios'
import { TaskForm } from '../components/TaskForm'
import { TaskList } from '../components/TaskList'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/tasks")
      .then(res => setTasks(res.data.tasks))
      .catch(err => console.log(err))
  }, [refresh])

  function addTask(task) {
    axios.post("http://127.0.0.1:5000/tasks", { taskDesc: task })
      .then(() => setRefresh(prev => prev + 1))
      .catch(err => console.log(err))
  }

  function editTask(task, newTxt) {
    let request = newTxt
      ? axios.patch(`http://127.0.0.1:5000/tasks/${task.id}`, { taskDesc: newTxt })
      : axios.delete(`http://127.0.0.1:5000/tasks/${task.id}`)

    request.then(() => setRefresh(prev => prev + 1)).catch(console.log)
  }

  return (
    <div>
      <h2>Tasks</h2>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} editTask={editTask} />
    </div>
  )
}
