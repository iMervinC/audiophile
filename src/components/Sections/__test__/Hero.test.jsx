import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import { Hero } from '../Hero'
jest.mock('next/router')

describe('Hero', () => {
  let expectedRouterPush

  beforeEach(() => {
    expectedRouterPush = jest.fn()
    useRouter.mockImplementation(() => ({
      push: expectedRouterPush,
    }))
    render(<Hero />)
  })

  it('Button', () => {
    const btn = screen.getByTitle('Buttonhero')
    expect(btn).toBeInTheDocument()
    userEvent.click(btn)
    expect(expectedRouterPush).toBeCalledTimes(1)
    expect(expectedRouterPush).toBeCalledWith(
      '/products/item/xx99-mark-two-headphones'
    )
  })
})
