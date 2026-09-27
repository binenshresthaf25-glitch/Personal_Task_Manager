const FILTERS = ['All', 'Active', 'Completed']

function FilterButtons({ currentFilter, onFilterChange }) {
  return (
    <div className="filter-buttons">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          className={`btn btn-filter ${currentFilter === filter ? 'active' : ''}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}

export default FilterButtons
