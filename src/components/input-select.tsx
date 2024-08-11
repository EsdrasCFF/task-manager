import { ComponentProps } from 'react'

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
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
    </div>
  )
}
