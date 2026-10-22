// src/features/taskList/ui/TaskList.tsx
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
  const { tasks, filter, setFilter, removeTask, toggleTask, isLoading, isError, refetch } =
    useTasks();

  if (isLoading) return <p className={styles.state}>Загрузка...</p>;
  if (isError) return <p className={styles.state}>Ошибка загрузки</p>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        {FILTERS.map(({ value, label }) => (
          <FilterButton key={value} active={filter === value} onClick={() => setFilter(value)}>
            {label}
          </FilterButton>
        ))}
        <button type="button" onClick={refetch}>
          Обновить
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className={styles.empty}>Задач нет</p>
      ) : (
        <ul className={styles.list}>
          {tasks.map((task) => (
            <li key={task.id} className={styles.item}>
              <TaskCard task={task} onToggle={toggleTask} onRemove={removeTask} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
