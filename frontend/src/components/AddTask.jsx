import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';

const AddTask = () => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: (title) => axios.post('http://localhost:5001/api/tasks', { title }),
    onSuccess: () => {
      toast.success('Task added successfully!');
      setNewTaskTitle('');
      queryClient.invalidateQueries(['tasks']);
    },
    onError: (error) => {
      toast.error('Failed to add task: ' + (error.response?.data?.message || error.message));
    },
  });

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    createTaskMutation.mutate(newTaskTitle);
  };

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="What do you need to do?"
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value={newTaskTitle}
          onChange={(e) => {
            setNewTaskTitle(e.target.value);
          }}
        />
        <Button
          variant="gradient"
          size="xl"
          className="px-6"
          onClick={handleAddTask}
          disabled={createTaskMutation.isLoading}
        >
          <Plus className="size-5" /> {createTaskMutation.isLoading ? 'Adding...' : 'Add'}
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
