import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

async function addExpense(user, title, amount) {
  await user.type(screen.getByPlaceholderText(/e\.g\./i), title)
  await user.type(screen.getByPlaceholderText(/amount/i), String(amount))
  await user.click(screen.getByRole('button', { name: 'Add' }))
}

const spent = () => screen.getByText('Spent').nextElementSibling

describe('Pesa Tracker', () => {
  it('adds an expense and updates the total', async () => {
    const user = userEvent.setup()
    render(<App />)

    await addExpense(user, 'Lunch', 650)

    expect(screen.getByText('Lunch')).toBeInTheDocument()
    expect(spent()).toHaveTextContent('650')
  })

  it('shows an error for an invalid amount', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByPlaceholderText(/e\.g\./i), 'Lunch')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getByText(/amount must be more than 0/i)).toBeInTheDocument()
  })

  it('edits an existing expense', async () => {
    const user = userEvent.setup()
    render(<App />)
    await addExpense(user, 'Matatu', 100)

    await user.click(screen.getByRole('button', { name: 'Edit Matatu' }))
    const amount = screen.getByPlaceholderText(/amount/i)
    expect(amount).toHaveValue(100)

    await user.clear(amount)
    await user.type(amount, '150')
    await user.click(screen.getByRole('button', { name: 'Save changes' }))

    expect(spent()).toHaveTextContent('150')
    expect(screen.getByRole('heading', { name: 'Add expense' })).toBeInTheDocument()
  })

  it('deletes an expense', async () => {
    const user = userEvent.setup()
    render(<App />)
    await addExpense(user, 'Airtime', 50)

    await user.click(screen.getByRole('button', { name: 'Delete Airtime' }))

    expect(screen.queryByText('Airtime')).not.toBeInTheDocument()
  })

  it('only shows expenses for the selected month', async () => {
    const user = userEvent.setup()
    render(<App />)
    await addExpense(user, 'Rent', 15000)

    await user.click(screen.getByRole('button', { name: 'Previous month' }))
    expect(screen.queryByText('Rent')).not.toBeInTheDocument()
    expect(screen.getByText(/no expenses for this month/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /back to this month/i }))
    expect(screen.getByText('Rent')).toBeInTheDocument()
  })

  it('keeps expenses after a reload (localStorage)', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<App />)
    await addExpense(user, 'Chapati', 30)
    unmount()

    render(<App />)
    expect(screen.getByText('Chapati')).toBeInTheDocument()
  })
})
