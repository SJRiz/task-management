import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [txt, setTxt] = useState("")
  const [tasks, setTasks] = useState([])

  useEffect(()=> {
    axios.get("http://127.0.0.1:5000/tasks")
    .then((res)=> {
      setTasks(res.data.tasks)
    })
    .catch((err)=> {
      console.log(err)
    })
  } , [])

  function handleSubmit(e) {
    e.preventDefault()
    axios.post("http://127.0.0.1:5000/tasks", {"taskDesc": txt})
    .then((res)=> {
      setTxt("")
      setTasks([...tasks, res.data])
    })
    .catch((err)=> {
      console.log(err)
    })
  }

  return (
    <>
      <div>
        <p>New Item</p>
        <form onSubmit={handleSubmit}>
          <input type="text"
          value={txt}
          onChange={e=>setTxt(e.target.value)}/>
          <button type="submit">Add</button>
        </form>
        <p>Tasks</p>

        {tasks.map(task => {
          return (
            <div key={task.id}>
              <p>{task.taskDesc} - {task.id}</p>
            </div>
          )
        })}

      </div>
    </>
  )
}

export default App
