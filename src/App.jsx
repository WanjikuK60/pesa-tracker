import { useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import Summary from './components/Summary'
import { useLocalStorage } from './hooks/useLocalStorage'

export default function App() {
  const [expenses, setExpenses] = useLocalStorage('pesa.expenses', [])
  const [budget, setBudget] = useLocalStorage('pesa.budget', 20000)
  const [filter, setFilter] = useState('all')
  const [editingId, setEditingId] = useState(null)

  const editing = expenses.find((e) => e.id === editingId) ?? null

  function saveExpense(expense) {
    setExpenses((prev) =>
      prev.some((e) => e.id === expense.id)
        ? prev.map((e) => (e.id === expense.id ? expense : e)) // update
        : [expense, ...prev], // add
    )
    setEditingId(null)
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

      <Summary expenses={expenses} budget={budget} onBudgetChange={setBudget} />
      <ExpenseForm
        key={editingId ?? 'new'}
        editing={editing}
        onSave={saveExpense}
        onCancel={() => setEditingId(null)}
      />
      <ExpenseList
        expenses={expenses}
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
