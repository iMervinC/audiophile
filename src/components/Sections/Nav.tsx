import { useState, useEffect } from 'react'
import Img from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CategoryCard } from '@/components/UI'
import { useGetScroll } from '@/utils/hooks'
import { Navigation } from '@/utils/types'
import { Cart } from '@/components/Sections'
import { useAppSelector } from '@/app/hooks'

const Nav = () => {
  const route = useRouter()
  const navs: Navigation[] = ['home', 'headphones', 'speakers', 'earphones']
  const { scrollY } = useGetScroll()
  const [toggle, settoggle] = useState(false)
  const [cartToggle, setCartToggle] = useState(false)
  const [nav, setNav] = useState('home')
  const [scroll, setScroll] = useState(false)
  // const { cart } = useCartStore()
  const { cart } = useAppSelector((state) => state.cart)

  useEffect(() => {
    const storedNav = localStorage.getItem('Nav') || 'home'
    setNav(storedNav)
  }, [])

  useEffect(() => {
    let page = route.pathname.slice(1)
    setNav(page === '' ? 'home' : page)
  }, [route.pathname])

  useEffect(() => {
    localStorage.setItem('Nav', nav)
  }, [nav])

  useEffect(() => {
    scrollY > 100 ? setScroll(true) : setScroll(false)
  }, [scrollY])

  return (
    <div
      className={`fixed w-full z-[100] top-0 ${nav !== 'home' && 'bg-black'} ${
        scroll && 'bg-black'
      }`}
      data-testid="wrapper"
    >
      <nav
        className={`flex container items-center sm:justify-between border-b border-grey-shop px-[17px] lg:px-0 transition-all ease-out duration-500 py-[40px] ${
          scroll ? 'lg:py-[20px]' : 'lg:py-[40px]'
        }`}
        data-testid="nav"
      >
        <svg
          className="mr-9 sm:mr-0 block lg:hidden text-white hover:text-main fill-current"
          width="16"
          height="15"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => settoggle((bol) => !bol)}
          data-testid="burger"
        >
          <title>burger</title>
          <g>
            <path d="M0 0h16v3H0zM0 6h16v3H0zM0 12h16v3H0z" />
          </g>
        </svg>

        <Img
          src="/shared/desktop/logo.svg"
          height="25px"
          width="143px"
          alt="logo"
          className="cursor-pointer"
          onClick={() => {
            setNav('home')
            route.push('/')
          }}
        />

        <ul className="lg:flex sub-title space-x-[34px] text-white hidden">
          {navs.map((_nav) => (
            <li
              data-testid={`nav-${_nav}`}
              className={`hover:text-main cursor-pointer ${
                nav === _nav && 'text-main'
              } `}
              key={_nav}
              onClick={() => setNav(_nav)}
            >
              <Link href={`/${_nav === 'home' ? '' : _nav}`}>{_nav}</Link>
            </li>
          ))}
        </ul>
        <div
          className="relative ml-auto sm:ml-0 cursor-pointer"
          onClick={() => setCartToggle((bol) => !bol)}
          title="cart"
          role="button"
        >
          <svg
            className=" text-white hover:text-main fill-current "
            width="23"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.625 15.833c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.054-.935-2.054-2.083 0-1.15.922-2.084 2.054-2.084zm9.857 0c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.053-.935-2.053-2.083 0-1.15.92-2.084 2.053-2.084zm-9.857 1.39a.69.69 0 00-.685.694.69.69 0 00.685.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zm9.857 0a.69.69 0 00-.684.694.69.69 0 00.684.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zM4.717 0c.316 0 .59.215.658.517l.481 2.122h16.47a.68.68 0 01.538.262c.127.166.168.38.11.579l-2.695 9.236a.672.672 0 01-.648.478H7.41a.667.667 0 00-.673.66c0 .364.303.66.674.66h12.219c.372 0 .674.295.674.66 0 .364-.302.66-.674.66H7.412c-1.115 0-2.021-.889-2.021-1.98 0-.812.502-1.511 1.218-1.816L4.176 1.32H.674A.667.667 0 010 .66C0 .296.302 0 .674 0zm16.716 3.958H6.156l1.797 7.917h11.17l2.31-7.917z" />
          </svg>

          <span
            title="cart-counter"
            className="absolute -top-3 -right-3 rounded-full h-5 w-5 flex justify-center items-center text-white bg-main "
          >
            <p className="text-sm font-bold">{cart.length}</p>
          </span>
        </div>
        {toggle && <MobileNav />}
        {cartToggle && (
          <Cart
            items={cart}
            closeNav={() => setCartToggle(false)}
            scroll={scroll}
          />
        )}
      </nav>
    </div>
  )
}

const MobileNav = () => {
  const cats = ['headphones', 'speakers', 'earphones']

  return (
    <>
      <ul data-testid="mobile-nav" className="mobile-nav">
        {cats.map((cat) => (
          <CategoryCard
            key={cat}
            categories={cat}
            cb={() => console.log(cat)}
          />
        ))}
      </ul>
      <div className="bg-[hsla(0,0%,0%,0.7)] w-full h-full fixed top-[106px] left-0 z-[49] lg:hidden" />
    </>
  )
}

export { Nav }
