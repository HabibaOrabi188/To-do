import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import AddTaskForm from './components/AddTaskForm';
import TasksList from './components/TasksList';
import EditTaskForm from './components/EditTaskForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTask, editTask, deleteTask } from './redux/TaskSlice';

const socket = io('http://localhost:5000'); 

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('taskAdded', (task) => {
      dispatch(addTask(task)); 
    });

    socket.on('taskEdited', (updatedTask) => {
      dispatch(editTask({ id: updatedTask.id, updatedTask })); 
    });

    socket.on('taskDeleted', (taskId) => {
      dispatch(deleteTask(taskId)); 
    });
    return () => {
      socket.off('taskAdded');
      socket.off('taskEdited');
      socket.off('taskDeleted');
    };
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TasksList />} />
        <Route path="/add" element={<AddTaskForm />} />
        <Route path="/edit/:id" element={<EditTaskForm />} />
      </Routes>
    </Router>
  );
};

export default App;
