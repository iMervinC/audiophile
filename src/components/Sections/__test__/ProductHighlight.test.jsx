import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import { ProductHighlight } from '../ProductHighlight'
jest.mock('next/router')

describe('Hero', () => {
  let expectedRouterPush

  beforeEach(() => {
    expectedRouterPush = jest.fn()
    useRouter.mockImplementation(() => ({
      push: expectedRouterPush,
    }))
    render(<ProductHighlight />)
  })

  it('Button ZX9 SPEAKER', () => {
    const btn = screen.getByTitle('Buttonzx9')
    expect(btn).toBeInTheDocument()
    userEvent.click(btn)
    expect(expectedRouterPush).toBeCalledTimes(1)
    expect(expectedRouterPush).toBeCalledWith('/products/zx9-speaker')
  })

  it('Button ZX7 SPEAKER', () => {
    const btn = screen.getByTitle('Buttonzx7')
    expect(btn).toBeInTheDocument()
    userEvent.click(btn)
    expect(expectedRouterPush).toBeCalledTimes(1)
    expect(expectedRouterPush).toBeCalledWith('/products/zx7-speaker')
  })

  it('Button YX1 EARPHONES', () => {
    const btn = screen.getByTitle('Buttonyx1')
    expect(btn).toBeInTheDocument()
    userEvent.click(btn)
    expect(expectedRouterPush).toBeCalledTimes(1)
    expect(expectedRouterPush).toBeCalledWith('/products/yx1-earphones')
  })
})
