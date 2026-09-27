import { useState } from 'react'

const CATEGORIES = ['Work', 'Personal', 'Study', 'Urgent']

function TaskForm({ onAddTask }) {
  const [text, setText] = useState('')
  const [category, setCategory] = useState('Work')
  const [dueDate, setDueDate] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()

    if (trimmed === '') {
      setError('Please enter a task before adding.')
      return
    }

    onAddTask({
      text: trimmed,
      category,
      dueDate, // stays '' if the user didn't pick a due date
    })

    setText('')
    setCategory('Work')
    setDueDate('')
    setError('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form-row">
        <input
          type="text"
          className="task-input"
          placeholder="What do you need to do?"
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            if (error) setError('')
          }}
        />

        <select
          className="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="date-input"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          aria-label="Due date"
        />

        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </div>

      {error && <p className="form-error">{error}</p>}
    </form>
  )
}

export default TaskForm
