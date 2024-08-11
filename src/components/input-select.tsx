import { ComponentProps } from 'react'

import { TaskStatus } from '../features/tasks/helpers/task-data'
interface InputSelectProps extends ComponentProps<'select'> {
  label: string
  id: string
}

export function InputSelect({ label, id, ...rest }: InputSelectProps) {
  return (
    <div className="flex w-full flex-col space-y-1">
      <label className="text-sm font-semibold text-darkBlue" htmlFor={id}>
        {label}
      </label>
      <select
        {...rest}
        id={id}
        className="w-full rounded-lg border border-gray100 px-4 py-3 text-sm font-light outline-primary"
      >
        <option value={TaskStatus.DONE}>Manhã</option>
        <option value={TaskStatus.IN_PROGRESS}>Tarde</option>
        <option value={TaskStatus.NOT_STARTED}>Noite</option>
      </select>
    </div>
  )
}
