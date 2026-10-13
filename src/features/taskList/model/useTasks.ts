import type { Task } from 'entities/task';
import { useGetTasksQuery } from 'entities/task/api/taskApi';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type Filter = 'all' | 'completed' | 'incomplete';

export function useTasks() {
  const { data: remoteTasks = [], isLoading, isError, refetch } = useGetTasksQuery();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  // флаг: копировали ли мы уже данные с сервера
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && remoteTasks.length > 0) {
      initialized.current = true;

      setTasks(remoteTasks);
    }
  }, [remoteTasks]);

  const removeTask = useCallback((id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleTask = useCallback((id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }, []);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter((t) => t.completed);
      case 'incomplete':
        return tasks.filter((t) => !t.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  return {
    tasks: filteredTasks,
    filter,
    setFilter,
    removeTask,
    toggleTask,
    isLoading,
    isError,
    refetch,
  };
}
