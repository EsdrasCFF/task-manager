export enum TaskStatus {
  DONE = 'done',
  IN_PROGRESS = 'in_progress',
  NOT_STARTED = 'not_started',
}

export interface TaskData {
  id: string
  title: string
  description: string
  time: string
  status: TaskStatus
}
