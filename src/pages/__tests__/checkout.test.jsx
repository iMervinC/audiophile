import Checkout from '../checkout'
import { Providers } from '@/components/Wrapper'
import { render, screen } from '@testing-library/react'
import useEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import { CartStore } from '@/utils/hooks/Cart'
import { cartData } from '@/utils/testData'

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <CartStore.Provider {...providerProps}>{ui}</CartStore.Provider>,
    renderOptions
  )
}

jest.mock('next/router')

describe('Checkout Page', () => {
  let expectedBack

  beforeEach(() => {
    expectedBack = jest.fn()

    const providerProps = {
      value: { cart: cartData },
    }

    useRouter.mockImplementation(() => ({ back: expectedBack }))
    customRender(<Checkout />, { providerProps })
  })

  it('Checkout Title', () => {
    expect(
      screen.getByRole('heading', { level: 1, name: /checkout/i })
    ).toBeInTheDocument()
  })

  it('Back Button', () => {
    const backBtn = screen.getByRole('button', { name: /go back/i })
    expect(backBtn).toBeInTheDocument()
    useEvent.click(backBtn)
    expect(expectedBack).toBeCalledTimes(1)
  })

  it('Billing Details', () => {
    const nameInput = screen.getByRole('textbox', { name: /name/i })
    const emailAddressInput = screen.getByRole('textbox', {
      name: /email address/i,
    })
    const phoneNumberInput = screen.getByRole('textbox', {
      name: /phone number/i,
    })
  })
  it('Shipping Info', () => {
    const address = screen.getByRole('textbox', { name: /address/i })
    const zipCode = screen.getByRole('textbox', { name: /zip code/i })
    const city = screen.getByRole('textbox', { name: /city/i })
    const country = screen.getByRole('textbox', { name: /country/i })
  })
  it('Payment Details', () => {
    const payment = screen.getByRole('radio', { name: /payment method/i })
    const cod = screen.getByRole('radio', { name: /cash on delivery/i })
    const emonyNum = screen.getByRole('textbox', { name: /e-Money Number/i })
    const emonyPin = screen.getByRole('textbox', { name: /e-Money PIN/i })
  })
  it('Order Summary', () => {
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      /summary/i
    )
  })
})
