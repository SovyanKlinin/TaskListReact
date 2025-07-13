import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { loadTasks } from '../store/tasksSlice';

export const useLocalStorageSync = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.tasks.tasks);

  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      dispatch(loadTasks(JSON.parse(saved)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
};