import './add-task-dialog.css'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

import { TaskData, TaskStatus } from '../features/tasks/helpers/task-data'
import { taksDetailsSchema,TaskDetailsFormData } from '../pages/TaskDetailsPage'
import { Button } from './button'
import Input from './input'
import InputSelect from './input-select'

type Props = {
  isOpen: boolean
  handleCancelClick: () => void
  onSubmit: (task: TaskData) => void
}

export function AddTaskDialog({ isOpen, handleCancelClick, onSubmit }: Props) {
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

  function handleCancelButtonClick() {
    setValue('title', '')
    setValue('description', '')

    handleCancelClick()
  }

  async function handleSaveButtonClick(data: TaskDetailsFormData) {
    const task = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      time: data.period,
      status: TaskStatus.NOT_STARTED,
    }

    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    })

    if (!response.ok) {
      return toast.error('Erro ao adicinar tarefa. Por favor, tente novamente!')
    }

    setValue('title', '')
    setValue('description', '')
    onSubmit(task)
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
                  disabled={isSubmitting}
                  {...register('title')}
                />

                <InputSelect label="Horário" disabled={isSubmitting} {...register('period')} />

                <Input
                  placeholder="Descreva a tarefa"
                  label="Descrição"
                  errorMessage={errors.description?.message}
                  disabled={isSubmitting}
                  {...register('description')}
                />

                <div className="flex gap-3">
                  <Button variant="secondary" onClick={handleCancelButtonClick} type="button">
                    Cancelar
                  </Button>

                  <Button variant="primary" disabled={isSubmitting} type="submit">
                    Salvar
                    {isSubmitting && <Loader2 className="ml-1 animate-spin" size={16} />}
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
