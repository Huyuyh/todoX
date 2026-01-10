import { cn } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';

const TaskCard = ({ task, index }) => {
  const [isEditting, setIsEditting] = useState(false);

  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || '');
  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation({
    mutationFn: (title) => axios.put(`http://localhost:5001/api/tasks/${task._id}`, { title }),
    onSuccess: (res) => {
      const updatedTask = res.data;
      toast.success('Task updated successfully!');
      setUpdateTaskTitle(updatedTask.title || '');
      setIsEditting(false);
      queryClient.invalidateQueries(['tasks']);
    },
    onError: (error) => {
      toast.error('Failed to update task: ' + (error.response?.data?.message || error.message));
      setIsEditting(false);
    },
  });

  const handleUpdateTask = () => {
    if (!updateTaskTitle.trim()) return;
    updateTaskMutation.mutate(updateTaskTitle);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleUpdateTask();
    }
  };

  const completeTaskMutation = useMutation({
    mutationFn: () =>
      axios.put(
        `http://localhost:5001/api/tasks/${task._id}`,
        task.status === 'active'
          ? { status: 'complete', completedAt: new Date().toISOString() }
          : { status: 'active', completedAt: null }
      ),
    onSuccess: (res) => {
      const updatedTask = res.data;
      if (updatedTask.status === 'complete') {
        toast.success('Task completed!');
      } else {
        toast.success('Task active again!');
      }

      setUpdateTaskTitle(updatedTask.title || '');
      setIsEditting(false);
      queryClient.invalidateQueries(['tasks']);
    },
    onError: (error) => {
      toast.error('Failed to update task: ' + (error.response?.data?.message || error.message));
      setIsEditting(false);
    },
  });

  const handleCompleteTask = () => {
    completeTaskMutation.mutate();
  };

  const deleteTaskMutation = useMutation({
    mutationFn: () => axios.delete(`http://localhost:5001/api/tasks/${task._id}`),
    onSuccess: (res) => {
      const updatedTask = res.data;
      toast.success('Task delete successfully!');

      setUpdateTaskTitle(updatedTask.title || '');
      setIsEditting(false);
      queryClient.invalidateQueries(['tasks']);
    },
    onError: (error) => {
      toast.error('Failed to delete task: ' + (error.response?.data?.message || error.message));
      setIsEditting(false);
    },
  });

  const handleDeleteTask = () => {
    deleteTaskMutation.mutate();
  };

  return (
    <Card
      className={cn(
        'p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group',
        task.status === 'completed' && 'opacity-75'
      )}
      style={{ animateDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        <Button
          onClick={handleCompleteTask}
          variant="ghost"
          size="icon"
          className={cn(
            'flex-shrink-0 size-8 rounded-full transition-all duration-200',
            task.status === 'complete' ? 'text-success hover:text-success/80' : 'text-muted-foreground hover:primary'
          )}
        >
          {task.status === 'complete' ? <CheckCircle2 className="size-5" /> : <Circle className="size-5" />}
        </Button>

        <div className="flex-1 win-w-0">
          {isEditting ? (
            <Input
              placeholder="What should we need to do?"
              className="flex-1 h12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              value={updateTaskTitle}
              onChange={(e) => {
                setUpdateTaskTitle(e.target.value);
              }}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditting(false);
                setUpdateTaskTitle(task.title || '');
              }}
            />
          ) : (
            <p
              className={cn(
                'text-base transition-all duration-200',
                task.status === 'complete' ? 'line-through text-muted-foreground' : 'text-foreground'
              )}
            >
              {task.title}
            </p>
          )}

          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{new Date(task.createdAt).toLocaleString()}</span>
            {task.completedAt && (
              <>
                <span className="text-xs text-muted-foreground "> - </span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground "> {new Date(task.completedAt).toLocaleString()} </span>
              </>
            )}
          </div>
        </div>

        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          <Button
            onClick={() => setIsEditting(true)}
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
          >
            <SquarePen className="size-4" />
          </Button>

          <Button
            onClick={handleDeleteTask}
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
