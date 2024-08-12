import './add-task-dialog.css'

import { Loader2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

import { TaskData, TaskStatus } from '../features/tasks/helpers/task-data'
import { Button } from './button'
import Input from './input'
import InputSelect from './input-select'

export interface ErrosData {
  inputName: string
  errorMessage: string
}

type Props = {
  isOpen: boolean
  handleCancelClick: () => void
  handleSubmit: (task: TaskData) => void
}

export function AddTaskDialog({ isOpen, handleCancelClick, handleSubmit }: Props) {
  const [erros, setErrors] = useState<ErrosData[]>([])

  const [addTaskIsLoading, setAddTaskIsLoading] = useState(false)

  const nodeRef = useRef(null)

  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const selectRef = useRef<HTMLSelectElement>(null)

  const titleError = erros.find((error) => error.inputName === 'title')
  const descriptionError = erros.find((error) => error.inputName === 'description')

  async function handleSaveButtonClick() {
    setAddTaskIsLoading(true)
    const newErros = []

    const title = titleRef.current?.value
    const description = descriptionRef.current?.value
    const period = selectRef.current?.value

    if (!title?.trim()) {
      newErros.push({
        inputName: 'title',
        errorMessage: 'Título é obrigatório!',
      })
    }

    if (!period?.trim()) {
      newErros.push({
        inputName: 'period',
        errorMessage: 'Horário é obrigatório!',
      })
    }

    if (!description?.trim()) {
      newErros.push({
        inputName: 'description',
        errorMessage: 'Descrição é obrigatório!',
      })
    }

    setErrors(newErros)

    if (newErros.length > 0 || !title || !description || !period) {
      setAddTaskIsLoading(false)
      return
    }

    const task = {
      id: uuidv4(),
      title,
      description,
      time: period,
      status: TaskStatus.NOT_STARTED,
    }

    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    })

    if (!response.ok) {
      setAddTaskIsLoading(false)
      return toast.error('Erro ao adicinar tarefa. Por favor, tente novamente!')
    }

    handleSubmit(task)
    setAddTaskIsLoading(false)
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

              <div className="mt-4 w-full space-y-4">
                <Input
                  placeholder="Título da tarefa"
                  label="Título"
                  id="title"
                  ref={titleRef}
                  errorMessage={titleError?.errorMessage}
                  disabled={addTaskIsLoading}
                />

                <InputSelect
                  label="Horário"
                  id="period"
                  ref={selectRef}
                  disabled={addTaskIsLoading}
                  defaultValue="morning"
                />

                <Input
                  placeholder="Descreva a tarefa"
                  label="Descrição"
                  id="description"
                  ref={descriptionRef}
                  errorMessage={descriptionError?.errorMessage}
                  disabled={addTaskIsLoading}
                />

                <div className="flex gap-3">
                  <Button variant="secondary" onClick={handleCancelClick}>
                    Cancelar
                  </Button>

                  <Button
                    variant="primary"
                    onClick={handleSaveButtonClick}
                    disabled={addTaskIsLoading}
                  >
                    Salvar
                    {addTaskIsLoading && <Loader2 className="ml-1 animate-spin" size={16} />}
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}
