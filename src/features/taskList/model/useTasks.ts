import type { Task } from 'entities/task';
import { useCallback, useMemo, useState } from 'react';

export type Filter = 'all' | 'completed' | 'incomplete';

const initialTasks: Task[] = [
  { id: '1', title: 'Alice', completed: false },
  { id: '2', title: 'Bob', completed: false },
  { id: '3', title: 'Charlie', completed: false },
  { id: '4', title: 'David', completed: true },
  { id: '5', title: 'Alice', completed: false },
  { id: '6', title: 'Bob', completed: false },
  { id: '7', title: 'Charlie', completed: false },
  { id: '8', title: 'David', completed: true },
];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<Filter>('all');

  const removeTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    );
  }, []);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.completed);
      case 'incomplete':
        return tasks.filter((task) => !task.completed);
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
  };
}
