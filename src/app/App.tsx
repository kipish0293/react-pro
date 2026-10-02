import { TasksPage } from 'pages/tasks/ui/TasksPage';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.container}>
      <TasksPage />;
    </div>
  );
}

export default App;
