import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTask } from '../redux/TaskSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, Box, Typography } from '@mui/material';

const EditTaskForm = () => {
  const [todo, setTodo] = useState('');
  const [completed, setCompleted] = useState(false);
  const [priority, setPriority] = useState('Medium');  
  const [dueDate, setDueDate] = useState(''); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const task = useSelector((state) =>
    state.tasks.tasks.find((task) => task.id === parseInt(id))
  );

  useEffect(() => {
    if (task) {
      setTodo(task.todo);
      setCompleted(task.completed);
      setPriority(task.priority || 'Medium');
      setDueDate(task.dueDate || '');
    } else {
      navigate('/'); 
    }
  }, [task, id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todo) {
      alert('Please fill out the task description');
      return;
    }

    const updatedTask = {
      id: parseInt(id),
      todo,
      completed,
      priority,
      dueDate,
      userId: task.userId,
    };

    dispatch(editTask({ id: task.id, updatedTask }));  
    navigate('/');  
  };

  return (
    <Container style={styles.container}>
      <Typography variant="h4" align="center" sx={{ marginBottom: '20px' }}>
        Edit Task
      </Typography>
      {task ? (
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TextField
              label="Task Description"
              variant="outlined"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="Enter task description"
              fullWidth
              required
              style={styles.input}
            />
            <TextField
              label="Due Date"
              type="date"
              variant="outlined"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              fullWidth
              required
              style={styles.input}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Priority"
              variant="outlined"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              fullWidth
              select
              style={styles.input}
              SelectProps={{
                native: true,
              }}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </TextField>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                id="task-completed"
              />
              <Typography>Completed</Typography>
            </Box>
            <Button
              type="submit"
              variant="contained"
              style={styles.button}
            >
              Save Changes
            </Button>
          </Box>
        </form>
      ) : (
        <Typography align="center" sx={{ color: '#ff0000' }}>
          Task not found.
        </Typography>
      )}
    </Container>
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

export default EditTaskForm;
