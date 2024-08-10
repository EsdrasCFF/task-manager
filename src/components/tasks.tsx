import { CloudSun, Moon, Plus, Sun, Trash2 } from 'lucide-react'
import { Button } from './button'
import { TaskSeparator } from './task-separator'
import { useState } from 'react'
import { TaskStatus, tasksData } from '../features/tasks/helpers/task-data'
import { TaskItem } from './taks-item'

export function Tasks() {
  const [tasks, setTasks] = useState(tasksData)

  const morningTasks = tasks.filter((task) => task.time == 'morning')
  const afternoonTasks = tasks.filter((task) => task.time == 'afternoon')
  const eveningTasks = tasks.filter((task) => task.time == 'evening')

  function handleTaskItemButtonClick(taskId: number) {
    const newTaks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task
      }

      if (task.status === 'done') {
        return { ...task, status: TaskStatus.NOT_STARTED }
      }

      if (task.status === 'in_progress') {
        return { ...task, status: TaskStatus.DONE }
      }

      if (task.status === 'not_started') {
        return { ...task, status: TaskStatus.IN_PROGRESS }
      }

      return task
    })

    setTasks(newTaks)
  }

  return (
    <div className="mx-9 mt-[70px] w-full">
      {/* BUTTON AND TITLES */}
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-primary">Minhas Tarefas</p>
          <h2 className="text-xl font-semibold text-darkBlue">
            Minhas Tarefas
          </h2>
        </div>

        <div className="flex h-full items-end gap-3">
          <Button
            title="Limpar Tarefas"
            icon={Trash2}
            variant="outline"
            onClick={() => {}}
          />
          <Button title="Nova Tarefa" icon={Plus} />
        </div>
      </div>

      {/* TASK LIST */}
      <div className="mt-6 space-y-3 rounded-lg bg-white p-6">
        <div className="space-y-3">
          <TaskSeparator title="Manhã" icon={Sun} />
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskButtonClick={handleTaskItemButtonClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TaskSeparator title="Tarde" icon={CloudSun} />
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskButtonClick={handleTaskItemButtonClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TaskSeparator title="Noite" icon={Moon} />
          {eveningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskButtonClick={handleTaskItemButtonClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
