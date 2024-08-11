import './add-task-dialog.css'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import { generateId } from '../features/tasks/helpers/generate-id'
import { TaskData, TaskStatus } from '../features/tasks/helpers/task-data'
import { Button } from './button'
import { Input } from './input'
import { InputSelect } from './input-select'

interface ErrosData {
  inputName: string
  errorMessage: string
}

type Props = {
  isOpen: boolean
  handleCancelClick: () => void
  handleSubmit: (task: TaskData) => void
}

export function AddTaskDialog({
  isOpen,
  handleCancelClick,
  handleSubmit,
}: Props) {
  const nodeRef = useRef(null)

  const [title, setTitle] = useState('')
  const [period, setPeriod] = useState('morning')
  const [description, setDescription] = useState('')

  const [erros, setErrors] = useState<ErrosData[]>([])

  const titleError = erros.find((error) => error.inputName === 'title')
  const descriptionError = erros.find(
    (error) => error.inputName === 'description'
  )

  function handleSaveButtonClick() {
    const newErros = []

    if (!title.trim()) {
      newErros.push({
        inputName: 'title',
        errorMessage: 'Título é obrigatório!',
      })
    }

    if (!period.trim()) {
      newErros.push({
        inputName: 'period',
        errorMessage: 'Horário é obrigatório!',
      })
    }

    if (!description.trim()) {
      newErros.push({
        inputName: 'description',
        errorMessage: 'Descrição é obrigatório!',
      })
    }

    setErrors(newErros)

    if (newErros.length > 0) {
      return
    }

    handleSubmit({
      id: generateId(),
      title,
      description,
      time: period,
      status: TaskStatus.NOT_STARTED,
    })
  }

  useEffect(() => {
    if (isOpen == false) {
      setDescription('')
      setTitle('')
    }
  }, [isOpen])

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
              <h1 className="text-xl font-semibold text-darkBlue">
                Nova Tarefa
              </h1>
              <p className="text-sm text-textGray">
                Insira as informações abaixo
              </p>

              <div className="mt-4 w-full space-y-4">
                <Input
                  placeholder="Título da tarefa"
                  label="Título"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  errorMessage={titleError?.errorMessage}
                />

                <InputSelect
                  label="Horário"
                  id="period"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                />

                <Input
                  placeholder="Descreva a tarefa"
                  label="Descrição"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  errorMessage={descriptionError?.errorMessage}
                />

                <div className="flex gap-3">
                  <Button variant="secondary" onClick={handleCancelClick}>
                    Cancelar
                  </Button>

                  <Button variant="primary" onClick={handleSaveButtonClick}>
                    Salvar
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
