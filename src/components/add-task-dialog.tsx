import './add-task-dialog.css'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'
import { v4 as uuidv4 } from 'uuid'

import { useCreateTaks } from '../features/tasks/api/use-create-task'
import { TaskStatus } from '../features/tasks/helpers/task-data'
import { taksDetailsSchema, TaskDetailsFormData } from '../pages/TaskDetailsPage'
import { Button } from './button'
import Input from './input'
import InputSelect from './input-select'

type Props = {
  isOpen: boolean
  onCancelClick: () => void
}

export function AddTaskDialog({ isOpen, onCancelClick }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TaskDetailsFormData>({
    resolver: zodResolver(taksDetailsSchema),
    defaultValues: {
      period: 'morning',
    },
  })

  const nodeRef = useRef(null)

  const createTaskMutation = useCreateTaks()
  const isPending = createTaskMutation.isPending

  function handleCancelButtonClick() {
    setValue('title', '')
    setValue('description', '')

    onCancelClick()
  }

  async function handleSaveButtonClick(data: TaskDetailsFormData) {
    const task = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      time: data.period,
      status: TaskStatus.NOT_STARTED,
    }

    createTaskMutation.mutate(task)

    onCancelClick()
    setValue('title', '')
    setValue('description', '')
  }

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={600}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            className="fixed inset-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm"
            ref={nodeRef}
          >
            <div className="flex w-full max-w-[340px] flex-col items-center rounded-xl bg-white p-5 shadow">
              <h1 className="text-xl font-semibold text-darkBlue">Nova Tarefa</h1>
              <p className="text-sm text-textGray">Insira as informações abaixo</p>

              <form
                className="mt-4 w-full space-y-4"
                onSubmit={handleSubmit(handleSaveButtonClick)}
              >
                <Input
                  placeholder="Título da tarefa"
                  label="Título"
                  errorMessage={errors.title?.message}
                  disabled={isSubmitting || isPending}
                  {...register('title')}
                />

                <InputSelect
                  label="Horário"
                  disabled={isSubmitting || isPending}
                  {...register('period')}
                />

                <Input
                  placeholder="Descreva a tarefa"
                  label="Descrição"
                  errorMessage={errors.description?.message}
                  disabled={isSubmitting || isPending}
                  {...register('description')}
                />

                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    onClick={handleCancelButtonClick}
                    type="button"
                    disabled={isPending}
                  >
                    Cancelar
                  </Button>

                  <Button variant="primary" disabled={isSubmitting || isPending} type="submit">
                    Salvar
                    {isSubmitting ||
                      (isPending && <Loader2 className="ml-1 animate-spin" size={16} />)}
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}
