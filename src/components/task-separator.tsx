import { LucideIcon } from 'lucide-react'

type Props = {
  title: string
  icon: LucideIcon
}

export function DayShift({ icon: Icon, title }: Props) {
  return (
    <h3 className="flex w-full items-center border-b-[2.5px] border-lightGray pb-1 text-sm font-semibold text-textGray">
      <Icon size={20} className="mr-2" /> {title}
    </h3>
  )
}
