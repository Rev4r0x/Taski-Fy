import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const isDuplicate = tasks.some(task => task.name.toLowerCase() === newTask.toLowerCase());

      if (!isDuplicate) {
        const updatedTasks = [...tasks, { name: newTask, description: newTaskDescription, completed: false, color: '#3498db' }];
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setNewTask('');
        setNewTaskDescription('');
        setErrorMessage('');
      } else {
        setErrorMessage('This task already exists!');
      }
    } else {
      setErrorMessage('Please enter a task!');
    }
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const changeColor = (index, newColor) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].color = newColor;
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Taski-Fy</h1>

      {/* Add Task */}
      <div>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="text"
          placeholder="Add a description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {/* Display Error Message */}
      {errorMessage && <p style={{ color: 'black' }}>{errorMessage}</p>}

      {/* Search Task */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search tasks"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="search-icon"></span>
      </div>

      {/* Task List */}
      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <div
              className="color-box"
              style={{ backgroundColor: task.color }}
              onClick={() => {
                const colorInput = document.getElementById(`color-input-${index}`);
                colorInput.click();
              }}
            ></div>
            <input
              id={`color-input-${index}`}
              type="color"
              value={task.color}
              onChange={(e) => changeColor(index, e.target.value)}
              style={{ display: 'none' }}
            />
            <div>
              <strong>{task.name}</strong>
              {task.description && <p>{task.description}</p>}
            </div>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(index)}
            />
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
