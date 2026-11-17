import { currentMonth, formatMonth, shiftMonth } from '../utils/month'

export default function MonthPicker({ month, onChange }) {
  const isCurrent = month === currentMonth()

  return (
    <nav className="month-picker" aria-label="Choose month">
      <button className="icon-btn" aria-label="Previous month" onClick={() => onChange(shiftMonth(month, -1))}>
        ‹
      </button>
      <div className="month-label">
        <strong>{formatMonth(month)}</strong>
        {!isCurrent && (
          <button className="link" onClick={() => onChange(currentMonth())}>
            Back to this month
          </button>
        )}
      </div>
      <button className="icon-btn" aria-label="Next month" onClick={() => onChange(shiftMonth(month, 1))}>
        ›
      </button>
    </nav>
  )
}
