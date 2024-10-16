import {useEffect, useState} from 'react';
import './App.css';

function App() {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch('http://127.0.0.1:8000/task/')
    .then(response => response.json())
    .then(data=> setTasks(data))
    .catch(err => console.log(err))
  }, [tasks]);
  
  const submitTask = () => {
    
  };

  return (
    <div>
      <h1>Your Task</h1>

      <input placeholder='Input task here...' onChange={(task) => setNewTask(task)}></input>
      <button onClick={submitTask}> Add Task </button>

      {tasks.map(task => (
            <li key = {task.id}>
              {task.date} - {task.description}
            </li>
      ))}
    </div>
  );
}

export default App;
