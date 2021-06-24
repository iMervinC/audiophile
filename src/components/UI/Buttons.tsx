import React from 'react'

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
  variant?: 'main' | 'bnw'
  cb?: () => void
}) => {
  return (
    <button
      onClick={cb}
      className={`${className} ${
        variant === 'main'
          ? 'bg-main text-white hover:bg-main-second'
          : 'bg-white hover:text-white hover:bg-black border-2 border-black'
      } w-40 h-12 transition-colors sub-title`}
      type={type}
    >
      {label}
    </button>
  )
}

export const ButtonArrow = ({
  cb,
  className,
}: {
  className?: string
  cb?: () => void
}) => {
  return (
    <button
      onClick={cb}
      className={`${className} sub-title w-[fit-content] h-[fit-content] text-grey-shop hover:text-main`}
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
