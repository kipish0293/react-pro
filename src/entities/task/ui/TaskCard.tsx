import { memo } from 'react';
import type { Task } from '../model/types';
import styles from './TaskCard.module.css';

type Props = {
  task: Task;
};

export const TaskCard = memo(({ task }: Props) => {
  return (
    <div className={styles.card}>
      <p>{task.title}</p>
    </div>
  );
});

TaskCard.displayName = 'TaskCard';
