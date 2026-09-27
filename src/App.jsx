import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import FilterButtons from './components/FilterButtons.jsx'
import Footer from './components/Footer.jsx'

const TASKS_STORAGE_KEY = 'personal-task-manager.tasks'
const THEME_STORAGE_KEY = 'personal-task-manager.theme'

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All')
  const [theme, setTheme] = useState('light')
  const [isLoaded, setIsLoaded] = useState(false)

  // Load tasks + theme from localStorage once, when the app first mounts
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY)
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks))
      }
    } catch (err) {
      console.error('Failed to load tasks from localStorage:', err)
    }

    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme)
      }
    } catch (err) {
      console.error('Failed to load theme from localStorage:', err)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save tasks to localStorage whenever they change (after initial load)
  useEffect(() => {
    if (!isLoaded) return
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
    } catch (err) {
      console.error('Failed to save tasks to localStorage:', err)
    }
  }, [tasks, isLoaded])

  // Apply the theme to the page and save it whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)

    if (!isLoaded) return
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch (err) {
      console.error('Failed to save theme to localStorage:', err)
    }
  }, [theme, isLoaded])

  const addTask = ({ text, category, dueDate }) => {
    const newTask = {
      id: generateId(),
      text,
      category,
      dueDate: dueDate || '',
      completed: false,
    }
    setTasks((prevTasks) => [newTask, ...prevTasks])
  }

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const editTask = (id, { text, category, dueDate }) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, text, category, dueDate: dueDate || '' }
          : task
      )
    )
  }

  // Moves the dragged task to the dropped-on task's position.
  // This works on the full tasks array (found by id), so the new order
  // is preserved correctly even if a filter (Active/Completed) is applied.
  const reorderTasks = (draggedId, targetId) => {
    setTasks((prevTasks) => {
      const updated = [...prevTasks]
      const draggedIndex = updated.findIndex((task) => task.id === draggedId)
      const targetIndex = updated.findIndex((task) => task.id === targetId)

      if (draggedIndex === -1 || targetIndex === -1) return prevTasks

      const [draggedTask] = updated.splice(draggedIndex, 1)
      updated.splice(targetIndex, 0, draggedTask)
      return updated
    })
  }

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Active') return !task.completed
    if (filter === 'Completed') return task.completed
    return true
  })

  const remainingCount = tasks.filter((task) => !task.completed).length
  const completedCount = tasks.filter((task) => task.completed).length

  return (
    <div className="app-container">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="app-main">
        <TaskForm onAddTask={addTask} />

        <FilterButtons currentFilter={filter} onFilterChange={setFilter} />

        <TaskList
          tasks={filteredTasks}
          onToggleComplete={toggleComplete}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
          onReorderTasks={reorderTasks}
        />
      </main>

      <Footer
        remainingCount={remainingCount}
        completedCount={completedCount}
        totalCount={tasks.length}
      />
    </div>
  )
}

export default App
