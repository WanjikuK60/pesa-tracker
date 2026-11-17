import { describe, expect, it } from 'vitest'
import { currentMonth, inMonth, shiftMonth } from './month'

describe('shiftMonth', () => {
  it('moves forward and back within a year', () => {
    expect(shiftMonth('2026-05', 1)).toBe('2026-06')
    expect(shiftMonth('2026-05', -1)).toBe('2026-04')
  })

  it('crosses year boundaries', () => {
    expect(shiftMonth('2026-12', 1)).toBe('2027-01')
    expect(shiftMonth('2026-01', -1)).toBe('2025-12')
  })
})

describe('currentMonth', () => {
  it('returns YYYY-MM for the given date', () => {
    expect(currentMonth(new Date(2026, 10, 17))).toBe('2026-11')
  })
})

describe('inMonth', () => {
  it('matches expenses by their date prefix', () => {
    expect(inMonth({ date: '2026-11-03' }, '2026-11')).toBe(true)
    expect(inMonth({ date: '2026-10-31' }, '2026-11')).toBe(false)
  })
})
