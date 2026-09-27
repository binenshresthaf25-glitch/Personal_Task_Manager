import { useState } from 'react'
import { isTaskOverdue, formatDueDate } from '../utils/dateUtils.js'

const CATEGORIES = ['Work', 'Personal', 'Study', 'Urgent']

function TaskItem({ task, onToggleComplete, onDeleteTask, onEditTask, onReorderTasks }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)
  const [editCategory, setEditCategory] = useState(task.category)
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '')
  const [isDragging, setIsDragging] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)

  const overdue = isTaskOverdue(task)

  const handleSave = () => {
    const trimmed = editText.trim()
    if (trimmed === '') return

    onEditTask(task.id, {
      text: trimmed,
      category: editCategory,
      dueDate: editDueDate,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditText(task.text)
    setEditCategory(task.category)
    setEditDueDate(task.dueDate || '')
    setIsEditing(false)
  }

  // ----- Native HTML5 drag-and-drop handlers (no library used) -----
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', task.id)
    e.dataTransfer.effectAllowed = 'move'
    setIsDragging(true)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    setIsDragOver(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault() // required so the browser allows a drop here
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const draggedTaskId = e.dataTransfer.getData('text/plain')
    if (draggedTaskId && draggedTaskId !== task.id) {
      onReorderTasks(draggedTaskId, task.id)
    }
  }

  if (isEditing) {
    return (
      <li className="task-item task-item-editing">
        <div className="task-edit-row">
          <input
            type="text"
            className="task-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
          <select
            className="category-select"
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
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
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            aria-label="Due date"
          />
        </div>
        <div className="task-actions">
          <button className="btn btn-save" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </li>
    )
  }

  const itemClassNames = [
    'task-item',
    task.completed ? 'completed' : '',
    overdue ? 'overdue' : '',
    isDragging ? 'dragging' : '',
    isDragOver ? 'drag-over' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <li
      className={itemClassNames}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="task-main">
        <span className="drag-handle" title="Drag to reorder">
          ⠿
        </span>

        <input
          type="checkbox"
          className="task-checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
        />

        <div className="task-details">
          <span className="task-text">{task.text}</span>

          <span className={`category-badge category-${task.category.toLowerCase()}`}>
            {task.category}
          </span>

          {task.dueDate && (
            <span className="due-date">📅 {formatDueDate(task.dueDate)}</span>
          )}

          {overdue && <span className="overdue-badge">Overdue</span>}
        </div>
      </div>

      <div className="task-actions">
        <button className="btn btn-edit" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button className="btn btn-delete" onClick={() => onDeleteTask(task.id)}>
          Delete
        </button>
      </div>
    </li>
  )
}

export default TaskItem
