import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import matchMediaPolyfill from 'mq-polyfill'
import { Nav } from '../Nav'

jest.mock('next/router')

describe('Navigation', () => {
  let getByTestId = screen.getByTestId
  let expectedRouterPush

  beforeEach(() => {
    expectedRouterPush = jest.fn()
    useRouter.mockImplementation(() => ({
      route: '/',
      pathname: '/',
      query: '',
      asPath: '',
      push: expectedRouterPush,
    }))

    render(<Nav />)
  })

  beforeAll(() => {
    matchMediaPolyfill(window)
    window.resizeTo = function resizeTo(width, height) {
      Object.assign(this, {
        innerWidth: width,
        innerHeight: height,
        outerWidth: width,
        outerHeight: height,
      }).dispatchEvent(new this.Event('resize'))
    }
  })

  it('Background smaller and black on Scroll', () => {
    const wrapper = getByTestId('wrapper')
    const navigation = getByTestId('nav')

    fireEvent.scroll(window, {
      target: { scrollY: 200 },
    })

    expect(wrapper.classList).toContain('bg-black')
    expect(navigation.classList).toContain('lg:py-[20px]')

    fireEvent.scroll(window, {
      target: { scrollY: 0 },
    })

    expect(wrapper.classList).not.toContain('bg-black')
    expect(navigation.classList).toContain('lg:py-[40px]')
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

    userEvent.click(routeEarphones)

    expect(routeEarphones.classList).toContain('text-main')
  })

  it('Navigation route headphones', () => {
    const routeHeadphones = getByTestId('nav-headphones')

    userEvent.click(routeHeadphones)

    expect(routeHeadphones.classList).toContain('text-main')
  })

  it('Logo', () => {
    const logo = screen.getByAltText('logo')
    expect(logo).toBeInTheDocument
    userEvent.click(logo)

    expect(expectedRouterPush).toBeCalledTimes(1)
    expect(expectedRouterPush).toBeCalledWith('/')
  })

  it('Mobile Menu toggle', () => {
    const burger = screen.getByTestId('burger')

    expect(burger).toBeVisible()

    userEvent.click(burger)

    expect(screen.queryByTestId('mobile-nav')).toBeInTheDocument()

    userEvent.click(burger)

    expect(screen.queryByTestId('mobile-nav')).not.toBeInTheDocument()
  })
})
