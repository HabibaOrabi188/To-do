const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

let tasks = [];

app.post('/tasks', (req, res) => {
  const newTask = { id: Date.now(), ...req.body };
  tasks.push(newTask);
  io.emit('taskAdded', newTask); 
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const updatedTask = { id: parseInt(id), ...req.body };
  tasks = tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
  io.emit('taskEdited', updatedTask);
  res.json(updatedTask);
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== parseInt(id));
  io.emit('taskDeleted', id); 
  res.status(204).send();
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
