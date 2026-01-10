import { Circle } from 'lucide-react';
import { Card } from './ui/card';

const TaskEmptyState = ({ filter }) => {
  return (
    <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
      <div className="space-y-3">
        <Circle className="mx-auto size-12 text-muted-foreground" />
        <h3 className="font-medium text-foreground">
          {filter === 'active'
            ? 'Do not have any active task'
            : filter === 'completed'
            ? 'Do not have any completed task'
            : 'Do not have any task'}
          <p className="text-sm text-muted-foreground">
            {filter === 'all'
              ? 'Please add first task to begin'
              : `Please move to "All" to see tasks ${filter === 'active' ? 'Active' : 'Completed'}`}
          </p>
        </h3>
      </div>
    </Card>
  );
};

export default TaskEmptyState;
