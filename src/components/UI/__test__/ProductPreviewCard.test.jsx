import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import userEvent from '@testing-library/user-event'
import ProductPreviewCard from '../ProductPreviewCard'

const data = {
  index: 1,
  image: {
    desktop: '/home/desktop/image-earphones-yx1.jpg',
  },
  slug: 'xx59-headphones',
  name: 'XX59 Headphones',
  description:
    'The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.',
  cb: () => {},
}

jest.mock('next/router')

describe('<ProductPreviewCard/>', () => {
  let expectedRouterPush

  beforeEach(() => {
    expectedRouterPush = jest.fn()
    useRouter.mockReturnValue({ push: expectedRouterPush })
    render(<ProductPreviewCard {...data} />)
  })

  test('Displayed Content', () => {
    expect(screen.getByText(new RegExp(data.description))).toBeInTheDocument()
    expect(screen.getByText(new RegExp(data.name))).toBeInTheDocument()
  })

  test('Button Clicked', () => {
    const btn = screen.getByTitle('Buttonsee-product')
    userEvent.click(btn)
    expect(expectedRouterPush).toHaveBeenCalledTimes(1)
    expect(expectedRouterPush).toHaveBeenCalledWith(`/products/${data.slug}`)
  })
})
