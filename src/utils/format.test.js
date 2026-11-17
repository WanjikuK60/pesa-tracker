import { describe, expect, it } from 'vitest'
import { categoryById, formatKES } from './format'

describe('formatKES', () => {
  it('formats shillings with thousands separators and no decimals', () => {
    expect(formatKES(1250)).toMatch(/1,250$/)
    expect(formatKES(1250)).not.toContain('.')
  })
})

describe('categoryById', () => {
  it('returns the matching category', () => {
    expect(categoryById('transport').label).toBe('Transport')
  })

  it('falls back to "Other" for unknown ids', () => {
    expect(categoryById('nope').id).toBe('other')
  })
})
