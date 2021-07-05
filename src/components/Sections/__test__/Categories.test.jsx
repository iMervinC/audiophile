import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Categories } from '../Categories'
import { useRouter } from 'next/router'

jest.mock('next/router')

describe('Categories Navigation', () => {
  let expectedRouterPush

  beforeEach(() => {
    expectedRouterPush = jest.fn()
    useRouter.mockImplementation(() => ({
      push: expectedRouterPush,
    }))

    render(<Categories />)
  })

  it('Go to Headphones', () => {
    const button = screen.getByRole('button', { name: 'Buttonheadphones' })

    userEvent.click(button)

    expect(expectedRouterPush).toHaveBeenCalledTimes(1)
    expect(expectedRouterPush).toHaveBeenCalledWith('/headphones')
  })

  it('Go to Earphones', () => {
    const button = screen.getByRole('button', { name: 'Buttonearphones' })

    userEvent.click(button)

    expect(expectedRouterPush).toHaveBeenCalledTimes(1)
    expect(expectedRouterPush).toHaveBeenCalledWith('/earphones')
  })

  it('Go to Speaker', () => {
    const button = screen.getByRole('button', { name: 'Buttonspeakers' })

    userEvent.click(button)

    expect(expectedRouterPush).toHaveBeenCalledTimes(1)
    expect(expectedRouterPush).toHaveBeenCalledWith('/speakers')
  })
})
