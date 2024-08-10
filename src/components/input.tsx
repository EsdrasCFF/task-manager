import { ComponentProps } from 'react'

interface InputProps extends ComponentProps<'input'> {
  label?: string
  id?: string
}

export function Input({ label, id, ...rest }: InputProps) {
  return (
    <div className="flex w-full flex-col space-y-1">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-darkBlue">
          {label}
        </label>
      )}
      <input
        id={id}
        className="w-full rounded-lg border border-gray100 px-4 py-3 text-sm font-light outline-primary"
        {...rest}
      />
    </div>
  )
}
