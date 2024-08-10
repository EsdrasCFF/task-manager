import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary'
}

export function Button({ variant = 'primary', ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={twMerge(
        'w-full rounded-lg p-2 text-sm font-semibold hover:bg-opacity-80',
        variant === 'primary' && 'bg-primary text-white',
        variant === 'secondary' && 'bg-lightGray text-darkBlue'
      )}
    />
  )
}
