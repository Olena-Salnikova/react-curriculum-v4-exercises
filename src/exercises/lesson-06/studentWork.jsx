import { useState } from 'react';
import UserProfile from './components/UserProfile';
import TaskFilterButtons from './components/TaskFilterButtons';
import TaskItem from './components/TaskItem';
import { filterTasks } from './utils/filterTasks';
import useTasksLoader from './hooks/useTasksLoader';

export default function StudentWork() {
  const { tasks, loading } = useTasksLoader();
  const [filter, setFilter] = useState('all');

  const visibleTasks = filterTasks(tasks, filter);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div>
      <UserProfile name="Student" />
      <TaskFilterButtons filter={filter} onChange={setFilter} />
      <ul>
        {visibleTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
