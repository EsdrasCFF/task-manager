import { ComponentProps } from 'react'
import { tv } from 'tailwind-variants'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
}

export function Button({ variant, className, ...rest }: ButtonProps) {
  const button = tv({
    base: `flex w-full items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold transition hover:bg-opacity-80 disabled:bg-opacity-50 ${className}`,
    variants: {
      variant: {
        primary: 'bg-primary text-white',
        secondary: 'bg-gray-300/30 text-darkBlue hover:bg-gray-300/50',
        outline: 'border border-gray-400 bg-transparent hover:bg-gray-300/20',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  })

  return <button {...rest} className={button({ variant })} />
}
