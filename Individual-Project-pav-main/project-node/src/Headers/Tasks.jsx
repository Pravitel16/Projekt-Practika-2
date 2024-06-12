import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Task from './TaskObj/Task';
import TaskDetails from './TaskObj/TaskDetails';
import '../Css/Project.css';

const TaskApp = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
      title: '',
      author: '',
      publisher: '',
      price: '',
      status: 'In Stock' // Default status
    });
    const [showForm, setShowForm] = useState(false);
    const [addButtonText, setAddButtonText] = useState('Add new book');
    const [editingTask, setEditingTask] = useState(false);
    const [formClass, setFormClass] = useState('task-form');
 
    useEffect(() => {
      fetchTasks();
    }, []);
   
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/books');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };
   
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewTask({
        ...newTask,
        [name]: value
      });
    };
 
    const handleAddTask = async () => {
      if (!showForm) {
        setShowForm(true);
        setAddButtonText('Close');
        setFormClass('task-form-grid');
      } else {
        setShowForm(false);
        setAddButtonText('Add new book');
        setEditingTask(false);
        setNewTask({
          title: '',
          author: '',
          publisher: '',
          price: '',
          status: 'In Stock' // Reset status when closing form
        });
        setFormClass('task-form');
      }
    };
 
    const handleCreateTask = async () => {
      if (validateTask()) {
        if (editingTask) {
          // If editing an existing task, update it instead of creating a new one
          const updatedTasks = tasks.map(task =>
            task.id === newTask.id ? { ...newTask, lastUpdated: new Date().toISOString() } : task
          );
          setTasks(updatedTasks);
          localStorage.setItem('tasks', JSON.stringify(updatedTasks));
          setNewTask({
            title: '',
            author: '',
            publisher: '',
            price: '',
            status: 'In Stock' // Reset status when closing form
          });
          setEditingTask(false);
          setShowForm(false);
          setAddButtonText('Add new book');
          setFormClass('task-form');
        } else {
          //  generate an ID and creation date
          const creationDate = new Date().toISOString();
          const dataToSend = {
            ...newTask,
            creationDate,
            lastUpdated: creationDate
          };
          try {
            const response = await fetch('http://localhost:8080/api/books', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(dataToSend)
            });
            if (!response.ok) {
              throw new Error('Failed to create task');
            }
            const responseData = await response.json();
            const updatedTasks = [...tasks, responseData];
            setTasks(updatedTasks);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            setNewTask({
              title: '',
              author: '',
              publisher: '',
              price: '',
              status: 'In Stock' // Reset status when closing form
            });
            setShowForm(false);
            setAddButtonText('Add new book');
            setFormClass('task-form');
          } catch (error) {
            console.error(error);
          }
        }
      } else {
        alert('Please fill in all fields');
      }
    };
 
    const validateTask = () => {
      return Object.values(newTask).every((val) => val !== '');
    };
 
    const handleDeleteTask = async (taskId) => {
      try {
        const response = await fetch(`http://localhost:8080/api/books/${taskId}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('Failed to delete task');
        }
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      } catch (error) {
        console.error(error);
      }
    };
 
    const handleEditTask = async (taskId) => {
      setEditingTask(true);
      const taskToEdit = tasks.find(task => task.id === taskId);
      setNewTask(taskToEdit);
      setShowForm(true);
      setAddButtonText('Close');
      setFormClass('task-form-grid');
    };

    const handleStatusChange = (e) => {
      setNewTask({
        ...newTask,
        status: e.target.value
      });
    };
 
    return (
       <div className="task-app">
         <h1>book</h1>
         <div className={formClass}>
          {showForm && (
             <>
               <input
                 className="task-input"
                 type="text"
                 placeholder="Title"
                name="title"
               value={newTask.title}
                onChange={handleInputChange}
              />
               <input
                className="task-input"
                 type="text"
                 placeholder="Author"
                 name="author"
                 value={newTask.author}
                onChange={handleInputChange}
               />
              <input
                 className="task-input"
                type="text"
                placeholder="Publisher"
                name="publisher"
                value={newTask.publisher}
                onChange={handleInputChange}
              />
             <input
                className="task-input"
               type="text"
               placeholder="Price"
                name="price"
                 value={newTask.price}
              onChange={handleInputChange}
              />
              <select
                className="task-input"
                value={newTask.status}
                onChange={handleStatusChange}
              >
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Sold">Sold</option>
              </select>
            <div className='flex1'>
              <button className="task-button" onClick={handleCreateTask}>{editingTask ? 'Update' : 'Create'}</button>
              </div>
            </>
          )}
            <div className='flex1'>
          <button className="task-button" onClick={handleAddTask}>{addButtonText}</button>
            </div>
        </div>
        <div>
          {tasks.map((task, index) => (
            <div key={index}>
              <Task
                className="task-item"
                task={task}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
              />
            </div>
          ))}
        </div>
        <Route path="/tasks/:id" component={() => <TaskDetails tasks={tasks} />} />
      </div>
    );
  };
 
  export default TaskApp;
