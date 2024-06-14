import React from 'react';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center mb-2">
          <div>
            <h3 className="text-lg font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
          </div>
          <div className="flex space-x-2">
            <button className="edit-btn px-4 py-2 bg-yellow-500 text-white rounded" onClick={() => onEdit(task)}>
              Edit
            </button>
            <button className="delete-btn px-4 py-2 bg-red-500 text-white rounded" onClick={() => onDelete(task._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
