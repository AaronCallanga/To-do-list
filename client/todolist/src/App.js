import {useEffect, useState} from 'react';
import './App.css';

function App() {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [updateTask, setUpdateTask] = useState("");

  useEffect(() => {
    fetch('http://127.0.0.1:8000/task/')
    .then(response => response.json())
    .then(data=> setTasks(data))
    .catch(err => console.log(err))
  }, []);
  
  const addTask = async () => {
    const taskData = {
      description: newTask,
    };  //this is the data that we will send to the server
    try {
      const response = await fetch('http://127.0.0.1:8000/task/add-task/', {  //this is the url of the server
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(taskData),                                       //we need to convert the data to json format to send it to the server
        });

        const data = await response.json();     //we catch the response from the server, sa return natin may data na binalik, so parang same lang to sa pag get method
        setTasks((prev) => [...prev, data]);  // so you dont need to relaod the page to show the new added task

    } catch (err) { 
      console.log (err)
    }
  };

  const handleUpdateTask = async (pk) => {
    const taskData = {
      description: updateTask,
    };  //this is the data that we will send to the server
    try {
      const response = await fetch(`http://127.0.0.1:8000/task/${pk}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      const data = await response.json();
      setTasks((prev) => (prev.map(task => task.id === pk ? data : task)));   //kung sinong task na kapareho ng id yun yung mag uupdate gamit yung data na na-return ng server
    } catch (err) {
      console.log(err);
    }
  }

  const deleteTask = async (pk) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/task/${pk}/`, {
          method: 'DELETE',
        })
        
        if (response.status === 204) {
          setTasks((prev) => prev.filter(task => task.id !==pk)) //filter is a function that will return a new array with the elements that pass the condition, will skip the element that has the same id as the pk 
        } else {
          console.log("Error in deleting task");
        }
      } catch (err) {
        console.log(err);
      }
  }

  return (
    <div>
      <h1>Your Task</h1>

      <input type="text"placeholder='Input task here...' onChange={(e) => setNewTask(e.target.value)}></input>
      <button onClick={addTask}> Add Task </button>  

      {tasks.map(task => (
        <ul>
            <li key = {task.id}>
              {task.date} - {task.description}
              <input placeholder='Update task...' type="text" onChange={(e) => setUpdateTask(e.target.value)}></input>
              <button onClick={() => handleUpdateTask(task.id)}>Update</button>
              <button onClick ={() => deleteTask(task.id)}>Delete</button>
            </li>
        </ul>
      ))}
    </div>
  );
}

export default App;
