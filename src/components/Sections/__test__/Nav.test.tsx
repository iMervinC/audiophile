import { render, fireEvent, screen } from '@testing-library/react'
import { Nav } from '../Nav'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: '',
      asPath: '',
    }
  },
}))

let getByTestId = screen.getByTestId

beforeEach(() => {
  render(<Nav />)
})

it('Background smaller and black on Scroll', () => {
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

it('Navigation route Home', () => {
  const routeHome = getByTestId('nav-home')
  expect(routeHome.classList).toContain('text-main')
})

it('Navigation route speakers', () => {
  const routeSpeakers = getByTestId('nav-speakers')
  fireEvent.click(routeSpeakers)

  expect(routeSpeakers.classList).toContain('text-main')
})

it('Navigation route earphones', () => {
  const routeEarphones = getByTestId('nav-earphones')

  fireEvent.click(routeEarphones)

  expect(routeEarphones.classList).toContain('text-main')
})

it('Navigation route headphones', () => {
  const routeHeadphones = getByTestId('nav-headphones')

  fireEvent.click(routeHeadphones)

  expect(routeHeadphones.classList).toContain('text-main')
})
