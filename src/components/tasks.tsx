import { Plus, Trash2 } from 'lucide-react'
import { Button } from './button'

export function Tasks() {
  return (
    <div className="mx-9 mt-[70px] w-full">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-primary">Minhas Tarefas</p>
          <h2 className="text-xl font-semibold text-darkBlue">
            Minhas Tarefas
          </h2>
        </div>

        <div className="flex h-full items-end gap-3">
          <Button title="Limpar Tarefas" icon={Trash2} variant="outline" />
          <Button title="Nova Tarefa" icon={Plus} />
        </div>
      </div>
    </div>
  )
}
