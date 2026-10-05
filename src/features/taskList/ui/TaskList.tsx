import { TaskCard } from 'entities/task';
import { FilterButton } from 'shared/ui/FilterButton';
import { useTasks, type Filter } from '../model/useTasks';
import styles from './TaskList.module.css';

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'completed', label: 'Выполненные' },
  { value: 'incomplete', label: 'Невыполненные' },
];

export function TaskList() {
  const { tasks, filter, setFilter, removeTask, toggleTask } = useTasks();

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        {FILTERS.map(({ value, label }) => (
          <FilterButton key={value} active={filter === value} onClick={() => setFilter(value)}>
            {label}
          </FilterButton>
        ))}
      </div>

      {tasks.length === 0 ? (
        <p className={styles.empty}>Задач нет</p>
      ) : (
        <ul className={styles.list}>
          {tasks.map((task) => (
            <li key={task.id} className={styles.item}>
              <input type="checkbox" onClick={() => toggleTask(task.id)} checked={task.completed} />
              <TaskCard task={task} />
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeTask(task.id)}
                aria-label="Удалить задачу"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
