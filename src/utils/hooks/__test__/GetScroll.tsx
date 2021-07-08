import { renderHook } from '@testing-library/react-hooks'
import { useGetScroll } from '../GetScroll'

describe('Get Scroll Position', () => {
  const {
    result: {
      current: { scrollY },
    },
  } = renderHook(() => useGetScroll())

  test('Initial Position', () => {
    expect(scrollY).toBe(0)
  })
})
