import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { TaskData } from '../features/tasks/helpers/task-data'

export default function TaskDetailsPage() {
  const { taskId } = useParams()

  const [taks, setTask] = useState<TaskData | null>(null)

  console.log(taks)

  useEffect(() => {
    const fetchTaks = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`)

      const data: TaskData = await response.json()

      setTask(data)
    }

    fetchTaks()
  }, [taskId])

  return <main></main>
}
