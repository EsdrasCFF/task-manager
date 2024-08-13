import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TaskData } from '../helpers/task-data'

type RequestType = {
  status: string
  taskId: string
}

export function useUpdateStatusTask() {
  const queryClient = useQueryClient()

  const mutation = useMutation<TaskData[], Error, RequestType>({
    mutationFn: async (json) => {
      const response = await fetch(`http://localhost:3000/tasks/${json.taskId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: json.status }),
      })

      if (!response.ok) {
        throw new Error('Failed to update status task')
      }

      const data = await response.json()

      return data
    },
    onMutate: (json) => {
      queryClient.setQueryData(['tasks'], (prevTasks: TaskData[]) => {
        const tasks = prevTasks.map((task) => {
          if (task.id !== json.taskId) {
            return task
          }

          return {
            ...task,
            status: json.status,
          }
        })

        return tasks
      })
    },
    onSuccess: () => {
      toast.success('Tarefa atualizada com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao atualizar tarefa, tente novamente!')
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ['tasks'] })
    // },
  })

  return mutation
}
