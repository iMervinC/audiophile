import Checkout from '../checkout'
import { fireEvent, render, screen } from '@testing-library/react'
import useEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import { CartStore } from '@/utils/hooks/Cart'
import { cartData } from '@/utils/testData'
import userEvent from '@testing-library/user-event'

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

    userEvent.type(nameInput, 'Mervin')
    expect(nameInput.value).toBe('Mervin')

    userEvent.type(phoneNumberInput, '091234567')
    expect(phoneNumberInput.value).toBe('091234567')

    userEvent.type(emailAddressInput, 'mervin@gmail.com')
    expect(emailAddressInput.value).toBe('mervin@gmail.com')
  })
  it('Shipping Info', () => {
    const zipCode = screen.getByRole('textbox', { name: /zip code/i })
    const city = screen.getByRole('textbox', { name: /city/i })
    const country = screen.getByRole('textbox', { name: /country/i })
    const address = screen.getByRole('textbox', { name: 'Address' })

    userEvent.type(zipCode, '1550')
    expect(zipCode.value).toBe('1550')

    userEvent.type(city, 'Manila')
    expect(city.value).toBe('Manila')

    userEvent.type(country, 'Philippines')
    expect(country.value).toBe('Philippines')

    userEvent.type(address, '217{space}Modesta')
    expect(address.value).toBe('217 Modesta')
  })
  it('Payment Details', () => {
    expect(
      screen.getByRole('heading', { level: 3, name: /payment details/i })
    ).toBeInTheDocument()
    const payment = screen.getByRole('radio', { name: /e-money/i })
    const cod = screen.getByRole('radio', { name: /cash on delivery/i })
    const emonyNum = screen.queryByRole('textbox', { name: 'e-Money Number' })
    const emonyPin = screen.queryByRole('textbox', { name: 'e-Money PIN' })
    expect(emonyNum).not.toBeInTheDocument()
    fireEvent.input(payment, {
      target: {
        value: 'test',
      },
    })
    expect(emonyNum).toBeInTheDocument()
  })
  it('Order Summary', () => {
    expect(screen.getByText('Summary')).toBeInTheDocument()
  })
})
