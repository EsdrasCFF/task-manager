import { twMerge } from 'tailwind-merge'

interface Props {
  title: string
  variant?: 'selected' | 'unselected'
}

export function SidebarButton({ title, variant = 'unselected' }: Props) {
  return (
    <a
      href="#"
      className={twMerge(
        'flex h-12 items-center rounded-lg pl-6',
        variant === 'selected' ? 'bg-lightBlue text-primary' : 'text-darkBlue'
      )}
    >
      {title}
    </a>
  )
}
