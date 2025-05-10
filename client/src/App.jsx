import { useState, useEffect } from 'react'
import axios from 'axios'
import { TaskForm } from './TaskForm'
import { TaskList } from './TaskList'

function App() {
  const [tasks, setTasks] = useState([])
  const [refresh, setRefresh] = useState(0)

  useEffect(()=> {
    axios.get("http://127.0.0.1:5000/tasks")
    .then((res)=> {
      setTasks(res.data.tasks)
    })
    .catch((err)=> {
      console.log(err)
    })
  } , [refresh])

  function addTask(task) {
    axios.post("http://127.0.0.1:5000/tasks", {"taskDesc": task})
    .then(()=> {
      setRefresh(prev => prev + 1)
    })
    .catch((err)=> {
      console.log(err)
    })
  }

  function editTask(task, newTxt) {
    let request;
  
    if (newTxt) {
      request = axios.patch(`http://127.0.0.1:5000/tasks/${task.id}`, {
        "taskDesc": newTxt
      });
    } else {
      request = axios.delete(`http://127.0.0.1:5000/tasks/${task.id}`);
    }
  
    request
      .then(() => {
        setRefresh(prev => prev + 1);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
      <div>
        <TaskForm addTask={addTask} />
        <TaskList tasks={tasks}
        editTask={editTask} />
      </div>
  )
}

export default App
