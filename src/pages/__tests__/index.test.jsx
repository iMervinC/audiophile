import Home from '../index'
import { render } from '@testing-library/react'

let page

beforeEach(() => {
  page = render(<Home />)
})

it('<Home/> match Snapshot', () => {
  expect(page.container).toMatchSnapshot()
})

test('Render Categories Component', () => {
  expect(page.getByTestId('Categories')).toBeTruthy()
})
test('Render Hero', () => {
  expect(page.getByTestId('Hero')).toBeTruthy()
})

test('Render Product Highlight', () => {
  expect(page.getByTestId('Product Highlight')).toBeTruthy()
})
test('Render About Component', () => {
  expect(page.getByTestId('About')).toBeTruthy()
})
