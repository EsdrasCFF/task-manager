import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ChevronRight, Loader2, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '../components/button'
import { ButtonWithIcon } from '../components/button-icon'
import Input from '../components/input'
import InputSelect from '../components/input-select'
import { Sidebar } from '../components/sidebar'
import { TaskData } from '../features/tasks/helpers/task-data'
import { useConfirm } from '../hooks/use-confirm'

export const taksDetailsSchema = z.object({
  title: z.string().min(3, { message: 'Título da tarefa é obrigatório!' }).trim(),
  period: z.string().min(3, { message: 'Selecione um período para a sua tarefa!' }).trim(),
  description: z.string().min(3, { message: 'Descrição da tarefa é obrigatória!' }).trim(),
})

export type TaskDetailsFormData = z.infer<typeof taksDetailsSchema>

export default function TaskDetailsPage() {
  const { taskId } = useParams()

  const [taks, setTask] = useState<TaskData | null>(null)
  const [deleteIsLoading, setDeleteIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskDetailsFormData>({
    resolver: zodResolver(taksDetailsSchema),
  })

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
      time: data.period,
    }

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify(task),
    })

    if (!response.ok) {
      toast.error('Erro ao atualizar tarefa!')
      return
    }

    const updatedTask = await response.json()

    setTask(updatedTask)
    toast.success('Tarefa atualizada com sucesso!')
    return
  }

  async function handleDeleteClick() {
    setDeleteIsLoading(true)
    const ok = await confirm()

    console.log({ ok })
    if (!ok) {
      setDeleteIsLoading(false)
      return
    }

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, { method: 'DELETE' })

    if (!response.ok) {
      toast.error('Ocorreu um erro ao deletar essa tarefa! Tente novamente.')
      setDeleteIsLoading(false)
      return
    }

    toast.success('Tarefa deletada com sucesso!')
    handleBackClick()
  }

  useEffect(() => {
    const fetchTaks = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`)

      const data: TaskData = await response.json()

      setTask(data)
      reset(data)
    }

    fetchTaks()
  }, [taskId, reset])

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
                {taks?.title}
              </span>
            </div>

            <p className="mt-1.5 text-xl font-semibold capitalize text-darkBlue">{taks?.title}</p>
          </div>

          <ButtonWithIcon
            icon={Trash2}
            title="Deletar Tarefa"
            className="self-end"
            variant="destructive"
            onClick={handleDeleteClick}
            disabled={deleteIsLoading}
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
            <Button className="w-fit" disabled={isSubmitting} type="submit">
              Salvar {isSubmitting && <Loader2 size={16} className="ml-2" />}
            </Button>
          </div>
        </form>
      </main>

      <ConfirmationDialog />
    </div>
  )
}
