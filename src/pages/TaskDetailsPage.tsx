import { ArrowLeft, ChevronRight, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '../components/button'
import { ButtonWithIcon } from '../components/button-icon'
import Input from '../components/input'
import { InputSelect } from '../components/input-select'
import { Sidebar } from '../components/sidebar'
import { TaskData } from '../features/tasks/helpers/task-data'

export default function TaskDetailsPage() {
  const { taskId } = useParams()
  const [taks, setTask] = useState<TaskData | null>(null)

  const navigate = useNavigate()

  function handleBackClick() {
    navigate(-1)
  }

  useEffect(() => {
    const fetchTaks = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`)

      const data: TaskData = await response.json()

      setTask(data)
    }

    fetchTaks()
  }, [taskId])

  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full px-[2.25rem] py-[1.875rem]">
        {/* HEADER */}
        <div className="flex w-full justify-between">
          <div className="flex flex-col">
            <button className="mb-4 w-fit rounded-full bg-primary p-1.5" onClick={handleBackClick}>
              <ArrowLeft size={20} className="text-white" strokeWidth={3} />
            </button>

            <div className="flex items-center text-xs">
              <p
                className="leading-none text-textGray hover:cursor-pointer"
                onClick={handleBackClick}
              >
                Minhas Tarefas
              </p>
              <ChevronRight size={12} className="mx-1 text-textGray" />
              <span className="font-semibold capitalize leading-none text-primary">
                {taks?.title}
              </span>
            </div>

            <p className="mt-1.5 text-xl font-semibold capitalize text-darkBlue">{taks?.title}</p>
          </div>

          <ButtonWithIcon
            icon={Trash2}
            title="Deletar Tarefa"
            className="self-end"
            variant="destructive"
          />
        </div>

        {/* MAIN */}
        <div className="mt-6 flex w-full flex-col gap-6 rounded-lg bg-white p-6">
          <Input label="Nome" placeholder={taks?.title} id="title" />
          <InputSelect id="period" label="Horário" value={taks?.time} disabled />
          <Input label="Descrição" placeholder={taks?.description} id="description" />
        </div>

        <div className="mt-9 flex w-full justify-end gap-3">
          <Button className="w-fit" variant="secondary">
            Cancelar
          </Button>
          <Button className="w-fit"> Salvar </Button>
        </div>
      </main>
    </div>
  )
}
