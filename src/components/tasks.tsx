import { CloudSun, Moon, Plus, Sun, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { useDeleteTaks } from '../features/tasks/api/use-delete-task'
import { useGetTasks } from '../features/tasks/api/use-get-tasks'
import { useUpdateStatusTask } from '../features/tasks/api/use-update-status'
import { TaskStatus } from '../features/tasks/helpers/task-data'
import { AddTaskDialog } from './add-task-dialog'
import { ButtonWithIcon } from './button-icon'
import { TaskItem } from './taks-item'
import { TaskSeparator } from './task-separator'

export function Tasks() {
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)

  const updateTaskStatusMutate = useUpdateStatusTask()
  const deleteTaskMutate = useDeleteTaks()

  const { data: tasks } = useGetTasks()

  const morningTasks = tasks?.filter((task) => task.period == 'morning')
  const afternoonTasks = tasks?.filter((task) => task.period == 'afternoon')
  const eveningTasks = tasks?.filter((task) => task.period == 'evening')

  function handleCheckBoxClick(taskId: string) {
    let newStatus: string = ''

    tasks?.map((task) => {
      if (task.id !== taskId) {
        return task
      }

      if (task.status === 'done') {
        newStatus = TaskStatus.NOT_STARTED
      }

      if (task.status === 'in_progress') {
        newStatus = TaskStatus.DONE
      }

      if (task.status === 'not_started') {
        newStatus = TaskStatus.IN_PROGRESS
      }
    })

    updateTaskStatusMutate.mutate({ status: newStatus, taskId })
  }

  async function handleDeleteTaskItemClick(taskId: string) {
    deleteTaskMutate.mutate({ taskId })
  }

  function handleCloseDialogClick() {
    setAddTaskDialogIsOpen(false)
  }

  return (
    <div className="mt-[70px] w-full px-[2.25rem]">
      {/* BUTTON AND TITLES */}
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-primary">Minhas Tarefas</p>
          <h2 className="text-xl font-semibold text-darkBlue">Minhas Tarefas</h2>
        </div>

        <div className="flex h-full items-end gap-3 self-end">
          <ButtonWithIcon
            title="Limpar Tarefas"
            icon={Trash2}
            variant="outline"
            onClick={() => {}}
          />
          <ButtonWithIcon
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
          {!morningTasks ||
            (morningTasks?.length < 1 && (
              <p className="text-sm text-gray-400">Nenhuma tarefa para o período da manhã!</p>
            ))}

          {morningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleButtonClick={handleCheckBoxClick}
              onDeleteClick={handleDeleteTaskItemClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TaskSeparator title="Tarde" icon={CloudSun} />
          {!afternoonTasks ||
            (afternoonTasks.length < 1 && (
              <p className="text-sm text-gray-400">Nenhuma tarefa para o período da tarde</p>
            ))}

          {afternoonTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleButtonClick={handleCheckBoxClick}
              onDeleteClick={handleDeleteTaskItemClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TaskSeparator title="Noite" icon={Moon} />
          {!eveningTasks ||
            (eveningTasks.length < 1 && (
              <p className="text-sm text-gray-400">Nenhuma tarefa para o período da tarde</p>
            ))}

          {eveningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleButtonClick={handleCheckBoxClick}
              onDeleteClick={handleDeleteTaskItemClick}
            />
          ))}
        </div>
      </div>

      <AddTaskDialog isOpen={addTaskDialogIsOpen} onCancelClick={handleCloseDialogClick} />
    </div>
  )
}
