import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TaskData } from '../../tasks/helpers/task-data'

interface RequestData {
  title: string
  description: string
  period: string
  taskId: string
}

export function useUpdateTask() {
  const queryClient = useQueryClient()

  const mutation = useMutation<TaskData, Error, RequestData>({
    mutationFn: async (json) => {
      const response = await fetch(`http://localhost:3000/tasks/${json.taskId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: json.title,
          description: json.description,
          period: json.period,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update task')
      }

      const data = await response.json()

      return data
    },
    onError: () => {
      toast.error('Ocorreu um erro atualizar tarefa. Tente novamente!')
    },
    onSuccess: (json) => {
      queryClient.setQueryData(['tasks', json.id], (prevTaskData: TaskData) => {
        return {
          ...prevTaskData,
          title: json.title,
          description: json.description,
          period: json.period,
        }
      })
      toast.success('Tarefa atualizada com sucesso!')
    },
  })

  return mutation
}
