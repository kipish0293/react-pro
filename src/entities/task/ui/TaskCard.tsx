import type { Task } from '../model/types';
import styles from './TaskCard.module.css';

type Props = {
  task: Task;
};

export function TaskCard({ task }: Props) {
  return (
    <div className={styles.card}>
      <p>{task.title}</p>
      <input type="checkbox" disabled checked={task.completed} />
    </div>
  );
}
