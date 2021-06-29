import React from 'react'
import Img from 'next/image'
import { useRouter } from 'next/router'
import { Navigation } from '@/utils/types'

const navs: Navigation[] = ['home', 'headphones', 'speakers', 'earphones']

const Footer = () => {
  const route = useRouter()

  return (
    <footer className="bg-black">
      <div className="container px-9 lg:px-0">
        <nav className="flex flex-col justify-between pt-16 lg:flex-row">
          <div className="text-center">
            <Img
              src="/shared/desktop/logo.svg"
              height="25px"
              width="143px"
              className="cursor-pointer"
              onClick={() => {
                route.push('/')
              }}
            />
          </div>

          <ul className="flex flex-col text-center sub-title text-white mt-10 space-y-[34px] lg:space-x-[34px] lg:space-y-0 md:mt-7 lg:mt-0 lg:flex-row">
            {navs.map((_nav) => (
              <li
                className="hover:text-main cursor-pointer"
                key={_nav}
                onClick={() => route.push(`/${_nav === 'home' ? '' : _nav}`)}
              >
                {_nav}
              </li>
            ))}
          </ul>
        </nav>
        <div className="lg:flex-row text-main-text50 mt-16 text-center">
          <p className="lg:w-1/2 lg:text-left">
            Audiophile is an all in one stop to fulfill your audio needs. We’re
            a small team of music lovers and sound specialists who are devoted
            to helping you get the most out of personal audio. Come and visit
            our demo facility - we’re open 7 days a week.
          </p>
          <div className="flex mt-20 pb-10 space-y-5 flex-col lg:flex-row lg:justify-between lg:space-y-0 lg:h-40 lg:mt-0">
            <p className="font-bold text-white w-full lg:text-left lg:self-end">
              Copyright 2021. All Rights Reserved
            </p>
            <div className="space-x-4 w-full lg:text-right">
              <span>
                <Img
                  src="/shared/desktop/icon-facebook.svg"
                  width={24}
                  height={24}
                  className="hover:text-main fill-current"
                />
              </span>
              <span>
                <Img
                  src="/shared/desktop/icon-instagram.svg"
                  width={24}
                  height={24}
                />
              </span>
              <span>
                <Img
                  src="/shared/desktop/icon-twitter.svg"
                  width={24}
                  height={24}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
