import { CloudSun, Moon, Plus, Sun, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { tasksData, TaskStatus } from '../features/tasks/helpers/task-data'
import { AddTaskDialog } from './add-task-dialog'
import { Button } from './button'
import { TaskItem } from './taks-item'
import { TaskSeparator } from './task-separator'

export function Tasks() {
  const [tasks, setTasks] = useState(tasksData)
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)

  const morningTasks = tasks.filter((task) => task.time == 'morning')
  const afternoonTasks = tasks.filter((task) => task.time == 'afternoon')
  const eveningTasks = tasks.filter((task) => task.time == 'evening')

  function handleTaskItemButtonClick(taskId: number) {
    const newTaks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task
      }

      if (task.status === 'done') {
        toast.warning('Tarefa não realizada')
        return { ...task, status: TaskStatus.NOT_STARTED }
      }

      if (task.status === 'in_progress') {
        toast.success('Tarefa concluída com sucesso!')
        return { ...task, status: TaskStatus.DONE }
      }

      if (task.status === 'not_started') {
        toast.success('Tarefa iniciada com sucesso!')
        return { ...task, status: TaskStatus.IN_PROGRESS }
      }

      return task
    })

    setTasks(newTaks)
  }

  function handleTaksDeleteClick(taskId: number) {
    const newTaks = tasks.filter((task) => task.id !== taskId)
    setTasks(newTaks)
    toast.success('Tarefa deletada com sucesso!')
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
          <Button
            title="Nova Tarefa"
            icon={Plus}
            onClick={() => setAddTaskDialogIsOpen(true)}
          />
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
              handleButtonClick={handleTaskItemButtonClick}
              handleDeleteClick={handleTaksDeleteClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TaskSeparator title="Tarde" icon={CloudSun} />
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleButtonClick={handleTaskItemButtonClick}
              handleDeleteClick={handleTaksDeleteClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TaskSeparator title="Noite" icon={Moon} />
          {eveningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleButtonClick={handleTaskItemButtonClick}
              handleDeleteClick={handleTaksDeleteClick}
            />
          ))}
        </div>
      </div>

      <AddTaskDialog isOpen={addTaskDialogIsOpen} />
    </div>
  )
}
