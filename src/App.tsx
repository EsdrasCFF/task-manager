import { Toaster } from 'sonner'

import { Sidebar } from './components/sidebar'
import { Tasks } from './components/tasks'

export default function App() {
  return (
    <div className="flex">
      <Toaster />
      <Sidebar />
      <Tasks />
    </div>
  )
}
