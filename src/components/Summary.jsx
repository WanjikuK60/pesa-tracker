import { CATEGORIES, formatKES } from '../utils/format'

export default function Summary({ expenses, budget, onBudgetChange }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)
  const left = budget - total
  const pct = budget > 0 ? Math.min((total / budget) * 100, 100) : 0

  const byCategory = CATEGORIES.map((c) => ({
    ...c,
    total: expenses.filter((e) => e.category === c.id).reduce((s, e) => s + e.amount, 0),
  }))
    .filter((c) => c.total > 0)
    .sort((a, b) => b.total - a.total)

  return (
    <section className="card">
      <div className="summary-top">
        <div>
          <p className="muted">Spent</p>
          <p className="big">{formatKES(total)}</p>
        </div>
        <label className="budget">
          <span className="muted">Monthly budget</span>
          <input
            type="number"
            min="0"
            value={budget}
            onChange={(e) => onBudgetChange(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="bar">
        <div className={left < 0 ? 'fill over' : 'fill'} style={{ width: `${pct}%` }} />
      </div>
      <p className={left < 0 ? 'error' : 'muted'}>
        {left < 0 ? `Over budget by ${formatKES(-left)}` : `${formatKES(left)} left`}
      </p>

      {byCategory.length > 0 && (
        <ul className="breakdown">
          {byCategory.map((c) => (
            <li key={c.id}>
              <span>{c.emoji} {c.label}</span>
              <span>{formatKES(c.total)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
