export enum TaskStatus {
  DONE = 'done',
  IN_PROGRESS = 'in_progress',
  NOT_STARTED = 'not_started',
}

export interface TaskData {
  id: number
  title: string
  description: string
  time: string
  status: TaskStatus
}

export const tasksData: TaskData[] = [
  {
    id: 1,
    title: 'Fazer Compras',
    description: 'Comprar os ingredientes para o jantas',
    time: 'afternoon',
    status: TaskStatus.DONE,
  },
  {
    id: 2,
    title: 'Aula de Ingles',
    description: 'Finalizar aula de inglês',
    time: 'morning',
    status: TaskStatus.IN_PROGRESS,
  },
  {
    id: 3,
    title: 'Reunião TOTVS',
    description: 'Reunião com a Totvs, preparar material',
    time: 'morning',
    status: TaskStatus.NOT_STARTED,
  },
  {
    id: 4,
    title: 'Aula de Ingles',
    description: 'Finalizar aula de inglês',
    time: 'afternoon',
    status: TaskStatus.DONE,
  },
  {
    id: 5,
    title: 'Devocinal',
    description: 'Fazer devocional diario',
    time: 'evening',
    status: TaskStatus.IN_PROGRESS,
  },
  {
    id: 6,
    title: 'Aula de Ingles',
    description: 'Finalizar aula de inglês',
    time: 'evening',
    status: TaskStatus.NOT_STARTED,
  },
]
