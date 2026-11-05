import React from "react";
import { useState, useEffect } from "react";

const App = () => {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState(()=>{
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved):[]
  });

  useEffect(()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks))
  },[tasks])

  function addTask() {
    if (text.trim()==='') {
      return      
    }else{
      setTasks((prev)=>[...prev,{id:Date.now(),text:text,done:false}])
      setText('')
    }    
  }

  function toggleTask(id) {
    setTasks((prev)=>
      prev.map((task)=>
        task.id === id ? {...task, done: !task.done} :task
      )    
    )
  }

  function deleteTask(id) {
    setTasks((prev)=>
    prev.filter((task)=>task.id !==id)
    )
  }

  return (
    <div className="todo">
      <div className="heading">
        <h1>To-Do List</h1>
        <img src="https://images.pexels.com/photos/4195410/pexels-photo-4195410.jpeg" />
      </div>
      <div className="row">
        <input
          onChange={(e) => setText(e.target.value)}
          type="text"
          id="input-box"
          value={text}
          placeholder="Add your task"
        />
        <button onClick={addTask}>Add</button>
        
      </div>
      <ul id="list-container">
        {tasks.map((task, index) => (
          <li key={task.id}
          className={task.done ? 'checked':''}
          onClick={()=>toggleTask(task.id)}
          onDoubleClick={()=>deleteTask(task.id)}
          > {task.text}
          
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
