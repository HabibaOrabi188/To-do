import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask } from '../redux/TaskSlice';
import TaskItem from './TaskItem';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom'; 

const TasksList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.tasks.tasks);
  const status = useSelector((state) => state.tasks.status);
  const error = useSelector((state) => state.tasks.error);

  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [dispatch, status]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };
 
  const handleAddTask = () => {
    navigate('/add'); 
  };

  if (status === 'loading') {
    return (
      <div style={{ backgroundColor: '#e0e8ca', padding: '20px' }}>
        <CircularProgress />
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={{ backgroundColor: '#f1f3ed', padding: '20px',alignItems:'center' }}>
     
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        tasks.map((task) => {
          return (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={() => handleDelete(task.id)}
            />
          );
        })
      )}
       <button
        onClick={handleAddTask}
        style={{
          backgroundColor: '#8a9e8a',
          color: 'white',
          padding: '14px 50px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          alignSelf:'center',
          marginLeft:'45%',
          fontSize:20,
          fontWeight:'bold'

        }}
      >
        ADD TASK
      </button>
    </div>
  );
};

export default TasksList;
