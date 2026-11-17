import { useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import MonthPicker from './components/MonthPicker'
import Summary from './components/Summary'
import { useLocalStorage } from './hooks/useLocalStorage'
import { currentMonth, inMonth } from './utils/month'

export default function App() {
  const [expenses, setExpenses] = useLocalStorage('pesa.expenses', [])
  const [budget, setBudget] = useLocalStorage('pesa.budget', 20000)
  const [filter, setFilter] = useState('all')
  const [editingId, setEditingId] = useState(null)
  const [month, setMonth] = useState(currentMonth())

  const editing = expenses.find((e) => e.id === editingId) ?? null
  const monthExpenses = expenses.filter((e) => inMonth(e, month))

  function saveExpense(expense) {
    setExpenses((prev) =>
      prev.some((e) => e.id === expense.id)
        ? prev.map((e) => (e.id === expense.id ? expense : e)) // update
        : [expense, ...prev], // add
    )
    setEditingId(null)
    // Jump to the expense's month so it never "disappears" after saving.
    setMonth(expense.date.slice(0, 7))
  }

  function startEdit(id) {
    setEditingId(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function deleteExpense(id) {
    setExpenses((prev) => prev.filter((e) => e.id !== id))
    if (id === editingId) setEditingId(null)
  }

  return (
    <main className="app">
      <header>
        <h1>💸 Pesa Tracker</h1>
        <p className="muted">Know where your shillings go.</p>
      </header>

      <MonthPicker month={month} onChange={setMonth} />
      <Summary expenses={monthExpenses} budget={budget} onBudgetChange={setBudget} />
      <ExpenseForm
        key={editingId ?? 'new'}
        editing={editing}
        onSave={saveExpense}
        onCancel={() => setEditingId(null)}
      />
      <ExpenseList
        expenses={monthExpenses}
        filter={filter}
        onFilterChange={setFilter}
        onEdit={startEdit}
        onDelete={deleteExpense}
        editingId={editingId}
      />

      <footer className="muted small">Built with React + Vite · data stays in your browser</footer>
    </main>
  )
}
