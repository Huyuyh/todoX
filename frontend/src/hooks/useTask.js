import api from '@/lib/axios';
import { visibleTaskLimit } from '@/lib/data';
import { useQuery } from '@tanstack/react-query';
import { useReducer } from 'react';

// Initial state
const initialState = {
  filter: 'all',
  dateQuery: 'today',
  page: 1,
};

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, filter: action.payload, page: 1 };
    case 'SET_DATE':
      return { ...state, dateQuery: action.payload, page: 1 };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'RESET_ALL':
      return initialState;
    default:
      return state;
  }
}

// Custom hook
export function useTasks() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { filter, dateQuery, page } = state;

  // React Query
  const { data, isFetching } = useQuery({
    queryKey: ['tasks', filter, dateQuery, page],
    queryFn: async () => {
      const res = await api.get('/tasks', {
        params: {
          filter: dateQuery,
          status: filter,
          page,
          limit: visibleTaskLimit,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const { tasks = [], pagination, activeCount = 0, completeCount = 0 } = data ?? {};
  const totalPages = pagination?.totalPages ?? 1;

  // Action dispatchers
  const setFilter = (newFilter) => dispatch({ type: 'SET_FILTER', payload: newFilter });
  const setDateQuery = (newDateQuery) => dispatch({ type: 'SET_DATE', payload: newDateQuery });
  const setPage = (newPage) => dispatch({ type: 'SET_PAGE', payload: newPage });
  const resetAll = () => dispatch({ type: 'RESET_ALL' });

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  return {
    tasks,
    pagination,
    activeCount,
    completeCount,
    totalPages,
    filter,
    dateQuery,
    page,
    isFetching,
    setFilter,
    setDateQuery,
    setPage,
    resetAll,
    handleNext,
    handlePrev,
  };
}
