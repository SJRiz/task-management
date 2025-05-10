import { useState, useEffect } from 'react'
import axios from 'axios'
import { TaskForm } from './TaskForm'
import { TaskList } from './TaskList'

function App() {
  const [tasks, setTasks] = useState([]) // Loads the tasks from the DB
  const [refresh, setRefresh] = useState(0) // When changed, the page will automatically call the get method

  // Hook that gets the tasks from the database
  useEffect(()=> {
    axios.get("http://127.0.0.1:5000/tasks")
    .then((res)=> {
      setTasks(res.data.tasks)
    })
    .catch((err)=> {
      console.log(err)
    })
  } , [refresh]) // Anytime the refresh state is changed, update the tasks via the DB

  // Function that adds a task to the DB. Uses the POST method
  function addTask(task) {
    axios.post("http://127.0.0.1:5000/tasks", {"taskDesc": task})
    .then(()=> {
      setRefresh(prev => prev + 1)
    })
    .catch((err)=> {
      console.log(err)
    })
  }

  // Function that either edits or removes an individual task. Uses DELETE or PATCH depending if a text is given
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
