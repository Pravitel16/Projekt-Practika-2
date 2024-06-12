import React, { useState } from 'react';
import './Css/taskobj.css';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear().toString().slice(-2)}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    return formattedDate;
};

const Task = ({ task, onDeleteTask, onEditTask }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className='obj-container'>
            <h4>Book Title: {task.title}</h4>
            <p>Author: {task.author}</p>
            <p>Publisher: {task.publisher}</p>
            <p>Price: {task.price}</p>
            <button className='details-link' onClick={toggleDetails}>More Details</button>
            {showDetails && (
                <div className='showcase'>
                    
                    <button className='task-button' onClick={() => onDeleteTask(task.id)}>Delete</button>
                 
                </div>
            )}
        </div>
    );
};

export default Task;
