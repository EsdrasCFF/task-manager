import { useQuery } from '@tanstack/react-query'

import { TaskData } from '../helpers/task-data'

export function useGetTasks() {
  const query = useQuery<TaskData[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/tasks')

      if (!response.ok) {
        throw new Error('Failed to fetch tasks')
      }

      const data = await response.json()

      return data
    },
  })

  return query
}
