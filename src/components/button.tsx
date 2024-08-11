import { ComponentProps } from 'react'
import { tv } from 'tailwind-variants'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary'
}

export function Button({ variant = 'primary', ...rest }: ButtonProps) {
  const button = tv({
    base: 'w-full rounded-lg p-2 text-sm font-semibold hover:bg-opacity-80',
    variants: {
      variant: {
        primary: 'bg-primary text-white',
        secondary: 'bg-lightGray text-darkBlue',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  })

  return <button {...rest} className={button({ variant })} />
}
