import { renderHook } from '@testing-library/react-hooks'
import { useGetScroll } from '..'

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
