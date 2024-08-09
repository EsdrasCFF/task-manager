import { LucideIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

type Props = {
  title: string
  icon: LucideIcon
  variant?: 'primary' | 'outline'
}

export function Button({ icon: Icon, title, variant = 'primary' }: Props) {
  return (
    <button
      className={twMerge(
        'flex gap-1 rounded-md px-3 py-1 text-xs font-semibold transition hover:bg-opacity-60',
        variant == 'primary' ? 'bg-primary text-white' : 'text-darkGray'
      )}
    >
      {title} <Icon size={16} />
    </button>
  )
}
