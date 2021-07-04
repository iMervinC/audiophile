import { render, screen } from '@testing-library/react'
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

it('Render All', () => {
  render(<ProductsPreview data={data} />)

  data.forEach((item) => {
    expect(screen.getByText(new RegExp(item.name))).toBeInTheDocument
  })

  const renderItems = screen.getAllByRole('listitem')

  expect(renderItems.length).toEqual(data.length)
})
