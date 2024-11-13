import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';

const TaskItem = ({ task, onDelete }) => {
  return (
    <Box
      sx={{
        padding: 2,
        marginBottom: 2,
        borderRadius: 1,
        boxShadow: 2,
        backgroundColor: '#e0e8ca',
        display: 'flex',
        flexDirection: 'column',
        margin:4
      }}
    >
      <Typography variant="h6" gutterBottom>
        {task.title}  
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {task.todo}  
      </Typography>
      <Typography variant="body2" color={task.completed ? 'success.main' : 'error.main'}>
        Status: {task.completed ? 'Completed' : 'Pending'}
      </Typography>

      <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Link to={`/edit/${task.id}`} style={{ textDecoration: 'none' }}>
          <Button style={{backgroundColor: '#8a9e8a',}} variant="contained" >
            Edit Task
          </Button>
        </Link>

        <Button
          variant="outlined"
          color="error"
          onClick={onDelete} 
        >
          Delete Task
        </Button>
      </Box>
    </Box>
  );
};

export default TaskItem;
