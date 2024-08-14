import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ChevronRight, Loader2, Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '../components/button'
import { ButtonWithIcon } from '../components/button-icon'
import Input from '../components/input'
import InputSelect from '../components/input-select'
import { Sidebar } from '../components/sidebar'
import { useGetTaskDetails } from '../features/task-details.tsx/api/use-get-task-details'
import { useUpdateTask } from '../features/task-details.tsx/api/use-update-task'
import { useConfirm } from '../features/task-details.tsx/hooks/use-confirm'
import { useDeleteTaks } from '../features/tasks/api/use-delete-task'

export const taksDetailsSchema = z.object({
  title: z.string().min(3, { message: 'Título da tarefa é obrigatório!' }).trim(),
  period: z.string().min(3, { message: 'Selecione um período para a sua tarefa!' }).trim(),
  description: z.string().min(3, { message: 'Descrição da tarefa é obrigatória!' }).trim(),
})

export type TaskDetailsFormData = z.infer<typeof taksDetailsSchema>

export default function TaskDetailsPage() {
  const { taskId } = useParams()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskDetailsFormData>({
    resolver: zodResolver(taksDetailsSchema),
  })

  const { data: task } = useGetTaskDetails(taskId!, reset)
  const updateTaskMutation = useUpdateTask()
  const deleteTaskMutation = useDeleteTaks()

  const isLoading = updateTaskMutation.isPending || isSubmitting

  const [ConfirmationDialog, confirm] = useConfirm(
    'Gostaria de deletar esta tarefa',
    'Você tem certeza?'
  )

  const navigate = useNavigate()

  function handleBackClick() {
    navigate(-1)
  }

  async function handleSaveClick(data: TaskDetailsFormData) {
    const task = {
      title: data.title,
      description: data.description,
      period: data.period,
      taskId: taskId!,
    }

    updateTaskMutation.mutate(task)
  }

  async function handleDeleteClick() {
    const ok = await confirm()

    if (!ok) {
      return
    }

    deleteTaskMutation.mutate({ taskId: taskId! })

    toast.success('Tarefa deletada com sucesso!')
    handleBackClick()
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full px-[2.25rem] py-[1.875rem]">
        {/* HEADER */}
        <div className="flex w-full justify-between">
          <div className="flex flex-col">
            <button className="mb-4 w-fit rounded-full bg-primary p-1.5" onClick={handleBackClick}>
              <ArrowLeft size={20} className="text-white" strokeWidth={3} />
            </button>

            <div className="flex items-center text-xs">
              <p
                className="leading-none text-textGray hover:cursor-pointer"
                onClick={handleBackClick}
              >
                Minhas Tarefas
              </p>
              <ChevronRight size={12} className="mx-1 text-textGray" />
              <span className="font-semibold capitalize leading-none text-primary">
                {task?.title}
              </span>
            </div>

            <p className="mt-1.5 text-xl font-semibold capitalize text-darkBlue">{task?.title}</p>
          </div>

          <ButtonWithIcon
            icon={Trash2}
            title="Deletar Tarefa"
            className="self-end"
            variant="destructive"
            onClick={handleDeleteClick}
            disabled={deleteTaskMutation.isPending}
          />
        </div>

        {/* MAIN */}
        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="mt-6 flex w-full flex-col gap-6 rounded-lg bg-white p-6">
            <Input label="Nome" errorMessage={errors.title?.message} {...register('title')} />

            <InputSelect label="Horário" {...register('period')} />

            <Input
              label="Descrição"
              errorMessage={errors.description?.message}
              {...register('description')}
            />
          </div>

          <div className="mt-9 flex w-full justify-end gap-3">
            <Button className="w-fit" variant="secondary" onClick={handleBackClick} type="button">
              Cancelar
            </Button>
            <Button className="w-fit" disabled={isLoading} type="submit">
              Salvar {isLoading && <Loader2 size={16} className="ml-2" />}
            </Button>
          </div>
        </form>
      </main>

      <ConfirmationDialog />
    </div>
  )
}
