import type { Task } from '..';
import { baseApi } from '../../../shared/api/baseApi';

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<Task[], void>({
      query: () => 'todos',
      transformResponse: (response: Task[]): Task[] => response,
      providesTags: ['Tasks'],
    }),
  }),
});

export const { useGetTasksQuery } = tasksApi;
