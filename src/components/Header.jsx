function Header({ theme, onToggleTheme }) {
  return (
    <header className="app-header">
      <div className="app-header-top">
        <div>
          <h1>Personal Task Manager</h1>
          <p className="app-subtitle">Stay organized. Stay productive.</p>
        </div>

        <button
          type="button"
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          aria-label="Toggle dark and light theme"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </header>
  )
}

export default Header
