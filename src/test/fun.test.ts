import { toLower, mul } from './fun'

test('Lower Case', () => {
  expect(toLower('Mervin')).toBe('mervin')
})

test('Multiply', () => {
  expect(mul(2, 3)).toBe(6)
})
