import './add-task-dialog.css'

import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import { Button } from './button'
import { Input } from './input'
import { InputSelect } from './input-select'

type Props = {
  isOpen: boolean
  handleCancelClick: () => void
}

export function AddTaskDialog({ isOpen, handleCancelClick }: Props) {
  const nodeRef = useRef(null)

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
                />
                <InputSelect label="Horário" id="period" />
                <Input
                  placeholder="Descreva a tarefa"
                  label="Descrição"
                  id="description"
                />

                <div className="flex gap-3">
                  <Button variant="secondary" onClick={handleCancelClick}>
                    {' '}
                    Cancelar{' '}
                  </Button>
                  <Button variant="primary"> Salvas </Button>
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
