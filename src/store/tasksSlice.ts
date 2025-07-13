import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { Task } from '../types/Task';
import type { RootState } from './store';

interface TasksState {
  tasks: Task[];
}

const loadFromLocalStorage = (): Task[] => {
  const saved = localStorage.getItem('tasks');
  return saved ? JSON.parse(saved) : [];
};

const initialState: TasksState = {
  tasks: loadFromLocalStorage(),
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },

    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },

    completedTask: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    
    loadTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const selectTaskById = createSelector(
  [(state: RootState) => state.tasks.tasks, (_state, id) => id],
  (tasks, id) => tasks.find(task => task.id === id)
);

export const {
  addTask,
  completedTask,
  deleteTask,
  updateTask,
  loadTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;