import { LucideIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface Props {
  title: string
  variant?: 'selected' | 'unselected'
  icon: LucideIcon
}

export function SidebarButton({ title, variant = 'unselected', icon: Icon }: Props) {
  return (
    <a
      href="#"
      className={twMerge(
        'flex h-12 items-center rounded-lg pl-6',
        variant === 'selected' ? 'bg-lightBlue text-primary' : 'text-darkBlue'
      )}
    >
      <Icon size={24} className="mr-1" /> {title}
    </a>
  )
}
