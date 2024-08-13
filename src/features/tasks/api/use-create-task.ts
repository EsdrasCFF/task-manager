import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TaskData } from '../helpers/task-data'

type RequestType = {
  id: string
  title: string
  time: string
  description: string
  status: string
}

export function useCreateTaks() {
  const queryClient = useQueryClient()

  const mutation = useMutation<TaskData, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await fetch(`http://localhost:3000/tasks`, {
        method: 'POST',
        body: JSON.stringify(json),
      })

      if (!response.ok) {
        throw new Error('Failed to create task')
      }

      const data = await response.json()

      return data
    },
    onSuccess: (json) => {
      queryClient.setQueryData(['tasks'], (prevTasks: TaskData[]) => [...prevTasks, json])
      toast.success('Nova Tarefa criada com sucesse!')
    },
    onError: () => {
      toast.error('Erro ao criar nova tarefa. Tente novamente!')
    },
  })

  return mutation
}
