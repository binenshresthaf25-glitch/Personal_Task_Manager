// Small helper functions for working with a task's due date.
// Due dates are stored as plain 'YYYY-MM-DD' strings (the exact format
// an <input type="date" /> gives us). Comparing these strings directly
// works correctly and avoids timezone bugs that can happen when using
// the JavaScript Date object for comparisons.

export function getTodayString() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function isTaskOverdue(task) {
  if (!task.dueDate || task.completed) return false
  return task.dueDate < getTodayString()
}

export function formatDueDate(dateString) {
  if (!dateString) return ''
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day) // built in local time
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
