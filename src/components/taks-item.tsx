import { Check, ExternalLink, Loader2, LoaderCircle, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { tv } from 'tailwind-variants'

import { TaskData } from '../features/tasks/helpers/task-data'

interface Props {
  task: TaskData
  handleButtonClick: (taskId: string) => void
  onDeleteClick: (taskId: string) => void
}

export function TaskItem({ task, handleButtonClick, onDeleteClick }: Props) {
  const status = task.status

  const taksItem = tv({
    base: 'flex w-full items-center justify-between rounded-lg p-2 transition',
    variants: {
      status: {
        done: 'bg-lightBlue text-primary',
        in_progress: 'bg-lightYellow text-yellow',
        not_started: 'bg-lightGray text-gray-600',
      },
    },
    defaultVariants: {
      status: 'not_started',
    },
  })

  const taskButton = tv({
    base: 'flex size-6 items-center justify-center rounded-md text-white',
    variants: {
      status: {
        done: 'bg-primary',
        in_progress: 'bg-darkYellow',
        not_started: 'bg-gray-400',
      },
    },
  })

  const [deleteTaskIsLoading, setDeleteTaksIsLoading] = useState(false)

  async function handleDeleteButtonClick() {
    setDeleteTaksIsLoading(true)

    onDeleteClick(task.id)

    setDeleteTaksIsLoading(false)
  }

  return (
    <div className={taksItem({ status })}>
      <div className="flex items-center gap-3">
        <button className={taskButton({ status })} onClick={() => handleButtonClick(task.id)}>
          {task.status === 'done' && <Check size={16} strokeWidth={3} />}
          {task.status === 'in_progress' && (
            <LoaderCircle size={16} strokeWidth={3} className="animate-spin" />
          )}
          {task.status === 'not_started' && (
            <X size={16} strokeWidth={3} className="text-gray-400" />
          )}
        </button>

        <p className="text-sm leading-none">{task.title}</p>
      </div>

      <div className="flex gap-1 text-textGray transition-colors">
        {!deleteTaskIsLoading ? (
          <Trash2
            size={18}
            onClick={handleDeleteButtonClick}
            className="hover:cursor-pointer hover:text-gray-500"
          />
        ) : (
          <Loader2 size={18} className="animate-spin" />
        )}

        <Link to={`/tasks/${task.id}`} className="transition hover:text-gray-500">
          <ExternalLink size={18} />
        </Link>
      </div>
    </div>
  )
}
