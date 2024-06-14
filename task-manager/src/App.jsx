import React, { useState, useEffect } from 'react';
import TaskModal from './components/TaskModal';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:3000/tasks');
    const data = await response.json();
    setTasks(data);
  };

  const saveTask = async (task) => {
    const method = currentTask ? 'PUT' : 'POST';
    const url = currentTask ? `http://localhost:3000/tasks/${currentTask.id}` : 'http://localhost:3000/tasks';
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (response.ok) {
      fetchTasks();
      closeModal();
    }
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE',
    });
    fetchTasks();
  };

  const openModal = (task = null) => {
    setCurrentTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setCurrentTask(null);
    setModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => openModal()}>
        Add Task
      </button>
      <TaskList tasks={tasks} onEdit={openModal} onDelete={deleteTask} />
      {modalOpen && (
        <TaskModal
          task={currentTask}
          onClose={closeModal}
          onSave={saveTask}
        />
      )}
    </div>
  );
};

export default App;
