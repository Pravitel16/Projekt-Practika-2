import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Calenadr from '../Calendar';
import '../Css/Home.css';

const Homepage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [latestTask, setLatestTask] = useState(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && tasks.length > 0) {
      // sort last
      const tasksSortedByLastUpdated = tasks.slice().sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
      // sort create
      if (tasksSortedByLastUpdated[0].lastUpdated === tasksSortedByLastUpdated[tasksSortedByLastUpdated.length - 1].lastUpdated) {
        const tasksSortedByCreationDate = tasks.slice().sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
        setLatestTask(tasksSortedByCreationDate[0]);
      } else {
        setLatestTask(tasksSortedByLastUpdated[0]);
      }
    }
  }, [tasks, loading]);

  return (
    <div className='home-cont'>
      <div className='calendar-cont'>
        <Calenadr />
      </div>
      <div>
<div className='obj-color' >
        <h1>BookStore</h1>
        
</div>
        {loading ? (
          <p>Loading...</p>
        ) : latestTask ? (
          <div className='task-card'>
            <h2>Status: {latestTask.name}</h2>
            <p>Status: {latestTask.status}</p>
      
            <NavLink to={`/projects/${latestTask.id}`} className='details-link'>
              More Details
            </NavLink>
          </div>
        ) : (
          <p className='task-description'></p>
        )}
      </div>
    </div>
  );
};

export default Homepage;