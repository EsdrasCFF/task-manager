import { ArrowLeft, ChevronRight, Loader2, Trash2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { ErrosData } from '../components/add-task-dialog'
import { Button } from '../components/button'
import { ButtonWithIcon } from '../components/button-icon'
import Input from '../components/input'
import InputSelect from '../components/input-select'
import { Sidebar } from '../components/sidebar'
import { TaskData } from '../features/tasks/helpers/task-data'

export default function TaskDetailsPage() {
  const { taskId } = useParams()
  const [taks, setTask] = useState<TaskData | null>(null)

  const [erros, setErrors] = useState<ErrosData[]>([])

  const [saveIsLoading, setSaveIsLoading] = useState(false)

  const navigate = useNavigate()

  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const periodRef = useRef<HTMLSelectElement>(null)

  function handleBackClick() {
    navigate(-1)
  }

  const titleError = erros.find((errorData) => errorData.inputName === 'title')
  const descriptionError = erros.find((errorData) => errorData.inputName === 'description')

  async function handleSaveClick() {
    setSaveIsLoading(true)
    const newErros = []

    const title = titleRef.current?.value
    const description = titleRef.current?.value
    const period = periodRef.current?.value

    if (!title?.trim()) {
      newErros.push({
        inputName: 'title',
        errorMessage: 'Título é obrigatório!',
      })
    }

    if (!period?.trim()) {
      newErros.push({
        inputName: 'period',
        errorMessage: 'Horário é obrigatório!',
      })
    }

    if (!description?.trim()) {
      newErros.push({
        inputName: 'description',
        errorMessage: 'Descrição é obrigatório!',
      })
    }

    setErrors(newErros)

    if (newErros.length > 0 || !title || !description || !period) {
      setSaveIsLoading(false)
      return
    }

    const task = {
      title,
      description,
      time: period,
    }

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify(task),
    })

    if (!response.ok) {
      setSaveIsLoading(false)
      toast.error('Erro ao atualizar tarefa!')
      return
    }

    const data = await response.json()

    setTask(data)
    toast.success('Tarefa atualizada com sucesso!')
    setSaveIsLoading(false)
    return
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
          <Input
            label="Nome"
            defaultValue={taks?.title}
            id="title"
            ref={titleRef}
            errorMessage={titleError?.errorMessage}
          />
          <InputSelect id="period" label="Horário" defaultValue={taks?.time} ref={periodRef} />
          <Input
            label="Descrição"
            defaultValue={taks?.description}
            id="description"
            ref={descriptionRef}
            errorMessage={descriptionError?.errorMessage}
          />
        </div>

        <div className="mt-9 flex w-full justify-end gap-3">
          <Button className="w-fit" variant="secondary" onClick={handleBackClick}>
            Cancelar
          </Button>
          <Button className="w-fit" disabled={saveIsLoading} onClick={handleSaveClick}>
            Salvar {saveIsLoading && <Loader2 size={16} className="ml-2" />}
          </Button>
        </div>
      </main>
    </div>
  )
}
