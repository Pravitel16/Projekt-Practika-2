import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Task from './TaskObj/Task';
import TaskDetails from './TaskObj/TaskDetails';
import '../Css/Progress.css';

const Taskss = () => {
  const [tasks, setTasks] = useState([]);
  const [viewType, setViewType] = useState('list');
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
  const [searchQuery, setSearchQuery] = useState(''); // Новое состояние для строки поиска

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

  const renderTasksByStatus = (status) => {
    const filteredTasks = tasks.filter(task => 
      task.status === status && task.title.toLowerCase().includes(searchQuery.toLowerCase()) // Добавлен фильтр по строке поиска
    );
    if (filteredTasks.length === 0) {
      return <p> sold {status.toLowerCase()}</p>;
    }

    return viewType === 'list' ? (
      <div className="list-view">
        {filteredTasks.map((task, index) => (
          <div className='obj-change' key={index}>
            <Task task={task} onDeleteTask={handleDeleteTask} onEditTask={handleEditTask} />
          </div>
        ))}
      </div>
    ) : (
      <div className="grid-view">
        {filteredTasks.map((task, index) => (
          <div key={index}>
            <Task task={task} onDeleteTask={handleDeleteTask} onEditTask={handleEditTask} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`task-app ${viewType === 'list' ? 'list-view' : 'grid-view'}`}>
      <h1>Book</h1>
      <div>
        <div className="search-bar"> {/* Добавлен элемент строки поиска */}
          <input
            type="text"
            placeholder="Search by book"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="view-buttons">
          <button className={viewType === 'list' ? 'active' : ''} onClick={() => setViewType('list')}>List</button>
          <button className={viewType === 'grid' ? 'active' : ''} onClick={() => setViewType('grid')}>Grid</button>
        </div>
        <div className={`columns ${viewType === 'list' ? 'gridobj' : ''}`}>
          <div className={`column ${viewType === 'list' ? 'list-view-column' : 'grid-view-column'}`}>
            <h2>Sold</h2>
            {renderTasksByStatus('Sold')}
          </div>
          <div className={`column ${viewType === 'list' ? 'list-view-column' : 'grid-view-column'}`}>
            <h2>Out of Stock</h2>
            {renderTasksByStatus('Out of Stock')}
          </div>
          <div className={`column ${viewType === 'list' ? 'list-view-column' : 'grid-view-column'}`}>
            <h2>In Stock</h2>
            {renderTasksByStatus('In Stock')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskss;
