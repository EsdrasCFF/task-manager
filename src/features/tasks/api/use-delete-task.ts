import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TaskData } from '../helpers/task-data'

type RequestType = {
  taskId: string
}

export function useDeleteTaks() {
  const queryClient = useQueryClient()

  const mutation = useMutation<TaskData, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await fetch(`http://localhost:3000/tasks/${json.taskId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete task!')
      }

      const data = await response.json()
      return data
    },
    // onMutate: (json) => {
    //   queryClient.setQueryData(['tasks'], (prevTasks: TaskData[]) => {
    //     const tasks = prevTasks.filter((task) => task.id != json.taskId)
    //     return tasks
    //   })
    // },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.error('Erro ao deletar tarefa!')
    },
    onSuccess: (json) => {
      toast.success('Tarega deletada com sucesso!')
      queryClient.setQueryData(['tasks'], (prevTasks: TaskData[]) => {
        const tasks = prevTasks.filter((task) => task.id != json.id)
        return tasks
      })
    },
  })

  return mutation
}
