import { LucideIcon } from 'lucide-react'
import { ComponentProps } from 'react'
import { tv } from 'tailwind-variants'

interface ButtonProps extends ComponentProps<'button'> {
  title: string
  icon: LucideIcon
  variant?: 'primary' | 'outline' | 'destructive'
  className?: string
}

export function ButtonWithIcon({ icon: Icon, title, variant, className, ...props }: ButtonProps) {
  const button = tv({
    base: `flex gap-1 rounded-md px-3 py-1 text-xs font-semibold transition hover:bg-opacity-60 disabled:cursor-not-allowed ${className}`,
    variants: {
      variant: {
        primary: 'bg-primary text-white',
        outline: 'text-darkGray hover:bg-gray-200/40',
        destructive: 'bg-danger text-white',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  })

  return (
    <button className={button({ variant })} {...props}>
      {title} <Icon size={16} />
    </button>
  )
}
