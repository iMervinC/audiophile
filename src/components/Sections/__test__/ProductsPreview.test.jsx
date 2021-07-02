import { render, fireEvent, screen } from '@testing-library/react'
import ProductsPreview from '../ProductsPreview'

const data = [
  {
    id: 1,
    slug: 'xx59-headphones',
    name: 'XX59 Headphones',
    category: 'headphones',
    new: true,
    image: {
      desktop: '/home/desktop/image-earphones-yx1.jpg',
    },
  },
  {
    id: 2,
    slug: 'asd-headphones',
    name: 'asd Headphones',
    category: 'headphones',
    new: true,
    image: {
      desktop: '/home/desktop/image-earphones-yx1.jpg',
    },
  },
]

beforeAll(() => {
  render(<ProductsPreview data={data} />)
})

it('Products', () => {
  expect(screen.findByTestId(data[0].slug)).toBeTruthy()
  expect(screen.findByTestId(data[1].slug)).toBeTruthy()
})
