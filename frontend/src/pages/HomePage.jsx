import AddTask from '@/components/AddTask';
import DateTimeFilter from '@/components/DateTimeFilter';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import StatsAndFilters from '@/components/StatsAndFilters';
import TaskList from '@/components/TaskList';
import TaskListPagination from '@/components/TaskListPagination';
import api from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

const HomePage = () => {
  const { data } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => api.get('/tasks').then((res) => res.data),
  });

  const [filter, setFilter] = useState('all');

  const { tasks = [], activeCount = 0, completeCount = 0 } = data ?? {};

  const filteredTasks = useMemo(() => {
    if (filter === 'complete') return tasks.filter((task) => task.completed);
    if (filter === 'active') return tasks.filter((task) => !task.completed);
    return tasks;
  }, [tasks, filter]);

  return (
    <div className="min-h-screen w-full bg-[#fefcff] relative">
      {/* Dreamy Sky Pink Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />
      {/* Your Content/Components */}
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          <Header />

          <AddTask />
          <StatsAndFilters
            activeTaskCount={activeCount}
            completedTaskCount={completeCount}
            filter={filter}
            setFilter={setFilter}
          />
          <TaskList filteredTasks={filteredTasks} />
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination />
            <DateTimeFilter />
          </div>

          <Footer activeTasksCount={activeCount} completedTasksCount={completeCount} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
