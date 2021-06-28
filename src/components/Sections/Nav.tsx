import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import Img from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CategoryCard } from '@/components/UI'
import { useGetScroll } from '@/utils/hooks'

type Navigation = 'home' | 'headphones' | 'speakers' | 'earphones'

const Nav = () => {
  const route = useRouter()
  const navs: Navigation[] = ['home', 'headphones', 'speakers', 'earphones']
  const [toggle, settoggle] = useState(false)
  const [nav, setNav] = useState('home')
  const { scrollY } = useGetScroll()
  const [scroll, setScroll] = useState(false)
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
      className={`fixed w-full z-[100]  ${nav !== 'home' && 'bg-black'} ${
        scroll && 'bg-black'
      }`}
    >
      <nav
        className={`flex container items-center sm:justify-between border-b border-grey-shop px-[17px] lg:px-0 transition-all ease-out duration-500 ${
          scroll ? 'py-[20px]' : ' py-[40px]'
        }`}
      >
        <svg
          className="mr-9 sm:mr-0 lg:hidden text-white hover:text-main fill-current"
          width="16"
          height="15"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => settoggle((bol) => !bol)}
        >
          <g>
            <path d="M0 0h16v3H0zM0 6h16v3H0zM0 12h16v3H0z" />
          </g>
        </svg>

        <Img
          src="/shared/desktop/logo.svg"
          height="25px"
          width="143px"
          className="cursor-pointer"
          onClick={() => {
            setNav('home')
            route.push('/')
          }}
        />

        <ul className="lg:flex sub-title space-x-[34px] text-white hidden">
          {navs.map((_nav) => (
            <li
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
        <svg
          className="ml-auto sm:ml-0 text-white hover:text-main fill-current cursor-pointer"
          width="23"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8.625 15.833c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.054-.935-2.054-2.083 0-1.15.922-2.084 2.054-2.084zm9.857 0c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.053-.935-2.053-2.083 0-1.15.92-2.084 2.053-2.084zm-9.857 1.39a.69.69 0 00-.685.694.69.69 0 00.685.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zm9.857 0a.69.69 0 00-.684.694.69.69 0 00.684.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zM4.717 0c.316 0 .59.215.658.517l.481 2.122h16.47a.68.68 0 01.538.262c.127.166.168.38.11.579l-2.695 9.236a.672.672 0 01-.648.478H7.41a.667.667 0 00-.673.66c0 .364.303.66.674.66h12.219c.372 0 .674.295.674.66 0 .364-.302.66-.674.66H7.412c-1.115 0-2.021-.889-2.021-1.98 0-.812.502-1.511 1.218-1.816L4.176 1.32H.674A.667.667 0 010 .66C0 .296.302 0 .674 0zm16.716 3.958H6.156l1.797 7.917h11.17l2.31-7.917z" />
        </svg>
        {toggle && <MobileNav />}
      </nav>
    </div>
  )
}

const MobileNav = () => {
  const cats = ['headphones', 'speakers', 'earphones']

  return (
    <>
      <div className="mobile-nav">
        {cats.map((cat) => (
          <CategoryCard
            key={cat}
            categories={cat}
            cb={() => console.log(cat)}
          />
        ))}
      </div>
      <div className="bg-[hsla(0,0%,0%,0.7)] w-full h-full fixed top-[106px] left-0 z-[49] lg:hidden" />
    </>
  )
}

export { Nav }
