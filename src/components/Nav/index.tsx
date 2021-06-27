import React, { useState } from 'react'
import Img from 'next/image'
import Link from 'next/link'
import { CategoryCard } from '@/components/UI'

const Nav = () => {
  const navs = ['Home', 'Headphones', 'Speakers', 'Earphones']
  const [nav, setNav] = useState(true)

  return (
    <div className="fixed w-full bg-black lg:bg-transparent z-[100]">
      <nav className="flex container items-center py-[40px] sm:justify-between border-b border-grey-shop px-[17px] sm:px-0 ">
        <svg
          className="mr-9 sm:mr-0 lg:hidden text-white hover:text-main fill-current"
          width="16"
          height="15"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setNav((bol) => !bol)}
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
        />
        <ul className="lg:flex sub-title space-x-[34px] text-white hidden">
          {navs.map((nav) => (
            <li className="hover:text-main cursor-pointer" key={nav}>
              {nav}
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
        {nav && <MobileNav />}
      </nav>
    </div>
  )
}

const MobileNav = () => {
  const cats = ['headphones', 'speakers', 'earphones']

  return (
    <>
      <div className="fixed w-full z-50 top-[106px] left-0 bg-white rounded-b-xl flex flex-col justify-between items-center max-w-[1150px] space-y-20 h-mobilenav sm:h-[fit-content] overflow-auto sm:flex-row sm:space-y-0 sm:space-x-5 sm:px-5 xl:hidden sm:pt-16 sm:pb-20">
        {cats.map((cat) => (
          <CategoryCard key={cat} categories={cat} />
        ))}
      </div>
      <div className="bg-[hsla(0,0%,0%,0.7)] w-full h-full fixed top-[106px] left-0 z-[49]" />
    </>
  )
}

export default Nav