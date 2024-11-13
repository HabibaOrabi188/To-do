import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/TaskSlice';
import { useNavigate } from 'react-router-dom';

const AddTaskForm = () => {
  const [todo, setTodo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todo || !dueDate) {
      alert('Please fill out both fields');
      return;
    }

    const newTask = {
      id: Math.floor(Math.random() * 1000),
      todo,
      dueDate,
      completed: false,
      userId: 152,
    };

    dispatch(addTask(newTask));  
    navigate('/');  
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Task</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="task-todo" style={styles.label}>Task Description:</label>
          <input
            type="text"
            id="task-todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter task description"
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="task-dueDate" style={styles.label}>Due Date:</label>
          <input
            type="date"
            id="task-dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Add Task</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#e0e8ca',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: '50px auto',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '14px',
    color: '#333',
    marginBottom: '8px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
  },
};

export default AddTaskForm;
