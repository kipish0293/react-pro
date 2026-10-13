/* eslint-disable no-unused-vars */
// src/entities/task/ui/TaskCard.tsx
import { memo } from 'react';
import type { Task } from '../model/types';
import styles from './TaskCard.module.css';

interface Props {
  task: Task;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

export const TaskCard = memo(({ task, onToggle, onRemove }: Props) => {
  return (
    <div className={styles.card}>
      <label className={styles.label}>
        <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
        <span className={task.completed ? styles.done : undefined}>
          {task.title} {/* ← было task.todo */}
        </span>
      </label>
      <button
        type="button"
        className={styles.remove}
        onClick={() => onRemove(task.id)}
        aria-label={`Удалить задачу: ${task.title}`}
      >
        ✕
      </button>
    </div>
  );
});

TaskCard.displayName = 'TaskCard';
