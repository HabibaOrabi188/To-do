import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://dummyjson.com/todos';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get(API_URL);
  return response.data.todos;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
});

export const editTask = createAsyncThunk(
  'tasks/editTask',
  async ({ id, updatedTask }) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedTask);
    return response.data;
  }
);

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
});

export const toggleCompletion = createAsyncThunk(
  'tasks/toggleCompletion',
  async (taskId, { getState }) => {
    const state = getState();
    const task = state.tasks.tasks.find((task) => task.id === taskId);
    if (!task) return;

    const updatedTask = { ...task, completed: !task.completed };


    const response = await axios.put(`${API_URL}/${taskId}`, updatedTask);
    return response.data; 
  }
);

const initialState = {
  tasks: [],
  status: 'idle',
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
      })
      .addCase(toggleCompletion.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
  },
});

export default taskSlice.reducer;
