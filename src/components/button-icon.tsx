import { LucideIcon } from 'lucide-react'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ComponentProps<'button'> {
  title: string
  icon: LucideIcon
  variant?: 'primary' | 'outline'
}

export function ButtonWithIcon({
  icon: Icon,
  title,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        'flex gap-1 rounded-md px-3 py-1 text-xs font-semibold transition hover:bg-opacity-60',
        variant == 'primary' ? 'bg-primary text-white' : 'text-darkGray'
      )}
      {...props}
    >
      {title} <Icon size={16} />
    </button>
  )
}
