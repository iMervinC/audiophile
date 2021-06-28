import React, { FC } from 'react'

export const Button = ({
  type = 'submit',
  className,
  label,
  variant = 'main',
  cb,
}: {
  type?: 'button' | 'submit' | 'reset'
  className?: string
  label: string
  variant?: 'main' | 'bnw' | 'wnb'
  cb?: () => void
}) => {
  return (
    <button
      onClick={cb}
      className={`${className} ${
        variant === 'main'
          ? 'bg-main text-white hover:bg-main-second'
          : variant === 'bnw'
          ? 'text-white bg-black  hover:bg-[#4c4c4c]'
          : 'bg-white hover:text-white hover:bg-black border-2 border-black'
      } w-40 h-12 transition-colors sub-title`}
      type={type}
    >
      {label}
    </button>
  )
}

export const ButtonArrow: FC<{
  className?: string
  cb?: () => void
}> = ({ cb, className }) => {
  return (
    <button
      onClick={cb}
      className={`${className} sub-title w-[fit-content] h-[fit-content] text-grey-shop hover:text-main`}
      title="Button"
    >
      Shop
      <svg
        className="inline ml-3"
        width="8"
        height="12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.322 1l5 5-5 5"
          stroke="#D87D4A"
          strokeWidth="2"
          fill="none"
          fillRule="evenodd"
        />
      </svg>
    </button>
  )
}
