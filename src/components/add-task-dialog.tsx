import { createPortal } from 'react-dom'

import { Button } from './button'
import { Input } from './input'

type Props = {
  isOpen: boolean
  handleCancelClick: () => void
}

export function AddTaskDialog({ isOpen, handleCancelClick }: Props) {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
      <div className="flex w-full max-w-[340px] flex-col items-center rounded-xl bg-white p-5 shadow">
        <h1 className="text-xl font-semibold text-darkBlue">Nova Tarefa</h1>
        <p className="text-sm text-textGray">Insira as informações abaixo</p>

        <div className="mt-4 w-full space-y-4">
          <Input placeholder="Título da tarefa" label="Título" id="title" />
          <Input placeholder="Horário" label="Período" id="period" />
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
  )
}
