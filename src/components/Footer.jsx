function Footer({ remainingCount, completedCount, totalCount }) {
  return (
    <footer className="app-footer">
      <div className="task-stats">
        <span>Total: {totalCount}</span>
        <span>Remaining: {remainingCount}</span>
        <span>Completed: {completedCount}</span>
      </div>
      <p className="footer-note">Your tasks are saved automatically in this browser.</p>
    </footer>
  )
}

export default Footer
