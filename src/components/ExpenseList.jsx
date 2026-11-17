import { CATEGORIES, categoryById, formatDate, formatKES } from '../utils/format'

export default function ExpenseList({ expenses, filter, onFilterChange, onEdit, onDelete, editingId }) {
  const visible = expenses
    .filter((e) => filter === 'all' || e.category === filter)
    .sort((a, b) => b.date.localeCompare(a.date))

  return (
    <section className="card">
      <div className="list-head">
        <h2>Expenses</h2>
        <select value={filter} onChange={(e) => onFilterChange(e.target.value)}>
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
      </div>

      {visible.length === 0 ? (
        <p className="muted empty">Hakuna kitu hapa bado. Add your first expense.</p>
      ) : (
        <ul className="list">
          {visible.map((e) => {
            const cat = categoryById(e.category)
            return (
              <li key={e.id} className={e.id === editingId ? 'selected' : undefined}>
                <span className="emoji">{cat.emoji}</span>
                <div className="grow">
                  <p>{e.title}</p>
                  <p className="muted small">{cat.label} · {formatDate(e.date)}</p>
                </div>
                <strong>{formatKES(e.amount)}</strong>
                <button className="icon" aria-label={`Edit ${e.title}`} onClick={() => onEdit(e.id)}>
                  ✎
                </button>
                <button className="icon danger" aria-label={`Delete ${e.title}`} onClick={() => onDelete(e.id)}>
                  ✕
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
