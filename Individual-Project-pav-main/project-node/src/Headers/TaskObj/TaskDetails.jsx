import React from 'react';
import Task from './Task';

const TaskDetails = ({ tasks }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // Adjust the format as needed
    };

    return (
        <div>
            <h2>Task Details</h2>
            {tasks.map((task, index) => (
                <div key={index}>
                    <Task task={task} />
                    <p>Creation Date: {formatDate(task.creationDate)}</p>
                    <p>Last Updated: {formatDate(task.lastUpdated)}</p>
                </div>
            ))}
        </div>
    );
};

export default TaskDetails;