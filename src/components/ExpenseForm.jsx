import { useState } from 'react'
import { CATEGORIES } from '../utils/format'

// Local date as YYYY-MM-DD (toISOString would use UTC and can be a day off)
const today = () => new Date().toLocaleDateString('en-CA')

// When `editing` is an expense, the form is pre-filled and saves changes to it.
// App passes key={editing?.id}, so React remounts the form with fresh state.
export default function ExpenseForm({ editing, onSave, onCancel }) {
  const [title, setTitle] = useState(editing?.title ?? '')
  const [amount, setAmount] = useState(editing ? String(editing.amount) : '')
  const [category, setCategory] = useState(editing?.category ?? 'food')
  const [date, setDate] = useState(editing?.date ?? today())
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const value = Number(amount)
    if (!title.trim()) return setError('Add a short description.')
    if (!value || value <= 0) return setError('Amount must be more than 0.')

    onSave({
      id: editing?.id ?? crypto.randomUUID(),
      title: title.trim(),
      amount: value,
      category,
      date,
    })
    setTitle('')
    setAmount('')
    setError('')
  }

  return (
    <form className={editing ? 'card form editing' : 'card form'} onSubmit={handleSubmit}>
      <h2>{editing ? 'Edit expense' : 'Add expense'}</h2>
      <input
        placeholder="e.g. Lunch at Java"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="row">
        <input
          type="number"
          min="1"
          placeholder="Amount (KES)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="chips">
        {CATEGORIES.map((c) => (
          <button
            type="button"
            key={c.id}
            className={c.id === category ? 'chip active' : 'chip'}
            onClick={() => setCategory(c.id)}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>
      {error && <p className="error">{error}</p>}
      <div className="actions">
        {editing && (
          <button type="button" className="secondary" onClick={onCancel}>Cancel</button>
        )}
        <button className="primary" type="submit">{editing ? 'Save changes' : 'Add'}</button>
      </div>
    </form>
  )
}
