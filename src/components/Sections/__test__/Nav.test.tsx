import {
  render,
  fireEvent,
  Matcher,
  MatcherOptions,
} from '@testing-library/react'
import { Nav } from '../Nav'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    }
  },
}))

it('Background smaller and black on Scroll', () => {
  const elem = render(<Nav />)
  let getByTestId = elem.getByTestId
  const wrapper = getByTestId('wrapper')
  const navigation = getByTestId('nav')

  fireEvent.scroll(window, {
    target: { scrollY: 200 },
  })

  expect(wrapper.classList).toContain('bg-black')
  expect(navigation.classList).toContain('py-[20px]')

  fireEvent.scroll(window, {
    target: { scrollY: 0 },
  })

  expect(wrapper.classList).not.toContain('bg-black')
  expect(navigation.classList).toContain('py-[40px]')
})
