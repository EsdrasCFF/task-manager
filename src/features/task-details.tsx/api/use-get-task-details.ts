import { useQuery } from '@tanstack/react-query'

import { TaskData } from '../../tasks/helpers/task-data'

interface Data {
  title: string
  description: string
  period: string
}

export function useGetTaskDetails(taskId: string | undefined, reset: (data: Data) => void) {
  const query = useQuery<TaskData>({
    queryKey: ['tasks', taskId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`)

      if (!response.ok) {
        reset({
          title: '',
          description: '',
          period: '',
        })
        throw new Error('Failed to fetch tasks')
      }

      const data = await response.json()

      reset(data)

      return data
    },
  })

  return query
}
