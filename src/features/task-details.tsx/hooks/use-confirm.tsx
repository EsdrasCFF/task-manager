import { useState } from 'react'
import { createPortal } from 'react-dom'

import { Button } from '../../../components/button'

export function useConfirm(
  message: string,
  title: string
): [() => JSX.Element | null, () => Promise<unknown>] {
  const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const confirm = () =>
    new Promise((resolve) => {
      setIsOpen(true)
      setPromise({ resolve })
    })

  const handleClose = () => {
    setIsOpen(false)
    setPromise(null)
  }

  const handleConfirm = () => {
    promise?.resolve(true)
    handleClose()
  }

  const handleCancel = () => {
    promise?.resolve(false)
    handleClose()
  }

  function ConfirmationDialog() {
    if (!isOpen) {
      return null
    }

    return createPortal(
      <div className="fixed inset-0 flex items-center justify-center px-5 backdrop-blur-sm">
        <div className="flex min-h-36 w-full max-w-md border-spacing-2 flex-col rounded-lg border-darkBlue bg-white p-5 shadow-2xl shadow-current">
          <h2 className="text-xl font-semibold text-darkBlue">{title}</h2>
          <p className="mt-5 text-sm text-gray-500">{message}</p>

          <div className="mt-4 flex w-[200px] gap-4">
            <Button onClick={handleConfirm}>Sim</Button>
            <Button variant="outline" onClick={handleCancel}>
              Não
            </Button>
          </div>
        </div>
      </div>,
      document.body
    )
  }

  return [ConfirmationDialog, confirm]
}
