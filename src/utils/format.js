const kes = new Intl.NumberFormat('en-KE', {
  style: 'currency',
  currency: 'KES',
  maximumFractionDigits: 0,
})

export const formatKES = (amount) => kes.format(amount)

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })

export const CATEGORIES = [
  { id: 'food', label: 'Food', emoji: '🍛' },
  { id: 'transport', label: 'Transport', emoji: '🚐' },
  { id: 'airtime', label: 'Airtime & Data', emoji: '📱' },
  { id: 'rent', label: 'Rent & Bills', emoji: '🏠' },
  { id: 'fun', label: 'Fun', emoji: '🎉' },
  { id: 'other', label: 'Other', emoji: '🧾' },
]

export const categoryById = (id) =>
  CATEGORIES.find((c) => c.id === id) ?? CATEGORIES.at(-1)
