import TaskCard from './TaskCard';
import TaskEmptyState from './TaskEmptyState';

const TaskList = ({ filteredTasks, filter }) => {
  if (!filteredTasks || filteredTasks.length === 0) {
    return <TaskEmptyState filter={filter} />;
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task, index) => {
        return <TaskCard key={task._id ?? index} task={task} index={index} />;
      })}
    </div>
  );
};

export default TaskList;
