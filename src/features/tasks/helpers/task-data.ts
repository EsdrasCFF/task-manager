export interface TaskData {
  id: number
  title: string
  description: string
  time: 'afternoon' | 'morning' | 'evening'
  status: 'done' | 'in_progress' | 'not_started'
}

export const tasksData: TaskData[] = [
  {
    id: 1,
    title: 'Fazer Compras',
    description: 'Comprar os ingredientes para o jantas',
    time: 'afternoon',
    status: 'done',
  },
  {
    id: 2,
    title: 'Aula de Ingles',
    description: 'Finalizar aula de inglês',
    time: 'morning',
    status: 'in_progress',
  },
  {
    id: 3,
    title: 'Reunião TOTVS',
    description: 'Reunião com a Totvs, preparar material',
    time: 'morning',
    status: 'in_progress',
  },
  {
    id: 4,
    title: 'Aula de Ingles',
    description: 'Finalizar aula de inglês',
    time: 'afternoon',
    status: 'done',
  },
  {
    id: 5,
    title: 'Devocinal',
    description: 'Fazer devocional diario',
    time: 'evening',
    status: 'not_started',
  },
  {
    id: 6,
    title: 'Aula de Ingles',
    description: 'Finalizar aula de inglês',
    time: 'evening',
    status: 'not_started',
  },
]
