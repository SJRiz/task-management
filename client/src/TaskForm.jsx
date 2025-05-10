import { useState } from "react";

export function TaskForm({addTask}){

    const [txt, setTxt] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        addTask(txt)
        setTxt("")
      }

    return (
        <div>
            <p>New Item</p>
            <form onSubmit={handleSubmit}>
            <input type="text"
            value={txt}
            onChange={e=>setTxt(e.target.value)}/>
            <button type="submit">Add</button>
            </form>
        </div>
    )
}