import { Home, ListCheck } from 'lucide-react'

import { SidebarButton } from './sidebar-button'

export function Sidebar() {
  return (
    <aside className="h-screen w-72 bg-white">
      <div className="px-8 py-6">
        <h1 className="text-lg font-semibold text-primary">Task Manager</h1>
        <p className="mb-4 text-xs">
          Um simples{' '}
          <span className="font-semibold text-primary">
            organizador de tarefas
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-2 p-2 text-sm">
        <SidebarButton title="Início" icon={Home} />
        <SidebarButton
          title="Minhas Tarefas"
          variant="selected"
          icon={ListCheck}
        />
      </div>
    </aside>
  )
}
