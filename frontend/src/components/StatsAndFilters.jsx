import { FilterType } from '@/lib/data';
import { Filter } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const StatsAndFilters = ({ completedTaskCount = 0, activeTaskCount = 0, filter = 'all', handleSetFilter }) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex gap-3">
        <Badge variant="secondary" className="bg-white/50 text-accent-foreground border-info/50">
          {activeTaskCount} {FilterType.active}
        </Badge>
        <Badge variant="secondary" className="bg-white/50 text-accent-foreground border-info/50">
          {completedTaskCount} {FilterType.complete}
        </Badge>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        {Object.keys(FilterType).map((type) => {
          return (
            <Button
              key={type}
              variant={filter === type ? 'gradient' : 'ghost'}
              size="sm"
              className="capitalize"
              onClick={() => {
                handleSetFilter(type);
              }}
            >
              <Filter className="size-4" />
              {FilterType[type]}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default StatsAndFilters;
