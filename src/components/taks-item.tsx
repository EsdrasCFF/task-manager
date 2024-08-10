import { Check, ExternalLink, LoaderCircle, Trash2, X } from 'lucide-react'
import { TaskData } from '../features/tasks/helpers/task-data'
import { twMerge } from 'tailwind-merge'

interface Props {
  task: TaskData
  handleButtonClick: (taskId: number) => void
  handleDeleteClick: (taskId: number) => void
}

export function TaskItem({
  task,
  handleButtonClick,
  handleDeleteClick,
}: Props) {
  return (
    <div
      className={twMerge(
        'flex w-full items-center justify-between rounded-lg p-2 transition',
        task.status === 'done' && 'bg-lightBlue text-primary',
        task.status === 'in_progress' && 'bg-lightYellow text-yellow',
        task.status === 'not_started' && 'bg-lightGray text-gray-600'
      )}
    >
      <div className="flex items-center gap-3">
        <button
          className={twMerge(
            'flex size-6 items-center justify-center rounded-md text-white',
            task.status === 'done' && 'bg-primary',
            task.status === 'in_progress' && 'bg-darkYellow',
            task.status === 'not_started' && 'bg-gray-400'
          )}
          onClick={() => handleButtonClick(task.id)}
        >
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
        <Trash2
          size={18}
          onClick={() => handleDeleteClick(task.id)}
          className="hover:cursor-pointer hover:text-gray-500"
        />
        <ExternalLink size={18} />
      </div>
    </div>
  )
}
