import { Check, LoaderCircle, X } from 'lucide-react'
import { TaskData } from '../features/tasks/helpers/task-data'
import { twMerge } from 'tailwind-merge'

interface Props {
  task: TaskData
}

export function TaskItem({ task }: Props) {
  return (
    <div
      className={twMerge(
        'flex w-full gap-3 rounded-lg p-2',
        task.status === 'done' && 'bg-lightBlue text-darkBlue',
        task.status === 'in_progress' && 'bg-lightYellow text-yellow',
        task.status === 'not_started' && 'bg-lightGray text-darkBlue'
      )}
    >
      <div
        className={twMerge(
          'flex size-6 items-center justify-center rounded-md text-white',
          task.status === 'done' && 'bg-primary',
          task.status === 'in_progress' && 'bg-darkYellow',
          task.status === 'not_started' && 'bg-gray-400'
        )}
      >
        {task.status === 'done' && <Check size={16} strokeWidth={3} />}
        {task.status === 'in_progress' && (
          <LoaderCircle size={16} strokeWidth={3} className="animate-spin" />
        )}
        {task.status === 'not_started' && <X size={16} strokeWidth={3} />}
      </div>

      <p className="text-sm">{task.title}</p>
    </div>
  )
}
