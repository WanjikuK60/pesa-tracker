// Months are stored as 'YYYY-MM' strings, matching the start of an expense's date.

export function currentMonth(now = new Date()) {
  return now.toLocaleDateString('en-CA').slice(0, 7)
}

export function shiftMonth(month, delta) {
  const [year, m] = month.split('-').map(Number)
  const d = new Date(year, m - 1 + delta, 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

export function formatMonth(month) {
  const [year, m] = month.split('-').map(Number)
  return new Date(year, m - 1, 1).toLocaleDateString('en-KE', { month: 'long', year: 'numeric' })
}

export const inMonth = (expense, month) => expense.date.startsWith(month)
