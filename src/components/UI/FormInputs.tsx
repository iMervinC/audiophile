import { SetStateAction, useState, Dispatch } from 'react'

interface TF {
  name?: string
  id?: string
  placeholder: string
  label: string
}

interface RadioT {
  name?: string
  id?: string
  placeholder: string
}

interface CounterT {
  count: number
  setCount: Dispatch<SetStateAction<number>>
}

export const TextField = ({ name, id, placeholder, label }: TF) => {
  return (
    <div>
      <label htmlFor="name" className="block">
        {label}
      </label>
      <input
        className="px-6 py-5 w-[309px] h-[56px] rounded-lg border-2 border-grey-border  focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
        type="text"
        name={name}
        id={id}
        placeholder={placeholder}
      />
    </div>
  )
}

export const Radio = ({ placeholder, id, name }: RadioT) => {
  const [selected, setSelected] = useState(false)

  return (
    <div
      className={`flex items-center pl-6 w-[309px] h-[56px] rounded-lg border-2  ${
        selected ? 'border-main' : 'border-grey-border'
      }`}
    >
      <input type="radio" name={name} id={id} className="hidden" />

      <label
        htmlFor={id}
        className="w-5 h-5 inline-block mr-2 rounded-full border border-grey-border text-center radio-dot cursor-pointer"
      />
      <label
        htmlFor={id}
        className="flex-1 h-full flex items-center cursor-pointer"
      >
        <span>{placeholder}</span>
      </label>
    </div>
  )
}

export const Counter = ({ count, setCount }: CounterT) => {
  return (
    <div className="w-[120px] h-[48px] bg-grey font-bold flex items-center justify-around">
      <span
        className="hover:text-main cursor-pointer"
        onClick={() => setCount(count - 1)}
      >
        -
      </span>
      <span>{count}</span>
      <span
        className="hover:text-main cursor-pointer"
        onClick={() => setCount(count + 1)}
      >
        +
      </span>
    </div>
  )
}