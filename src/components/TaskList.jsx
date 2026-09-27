import TaskItem from './TaskItem.jsx'

function TaskList({ tasks, onToggleComplete, onDeleteTask, onEditTask, onReorderTasks }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks here yet. Add one above to get started!</p>
      </div>
    )
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
          onReorderTasks={onReorderTasks}
        />
      ))}
    </ul>
  )
}

export default TaskList
