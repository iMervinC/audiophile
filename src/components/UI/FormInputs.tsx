import { TF, RadioT, CounterT } from '@/utils/types'

export const TextField = ({
  name,
  placeholder,
  label,
  type = 'text',
  register,
  errors,
  className,
}: TF) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block font-bold">
        {label}
      </label>
      <input
        className={`px-6 py-5 h-[56px] w-full rounded-lg border-2 border-grey-border  focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent ${
          errors && 'border-red-700'
        }`}
        type={type}
        id={name}
        placeholder={placeholder}
        {...register(name!, {
          required: `${name} is required`,
          pattern:
            name === 'email'
              ? /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              : /[\w+\d+]/g,
        })}
      />
      {errors && (
        <p className="text-red-700 font-bold uppercase">{errors.message}</p>
      )}
    </div>
  )
}

export const Radio = ({
  placeholder,
  id,
  name,
  value,
  selected = false,
  register,
}: RadioT) => {
  return (
    <div
      className={`flex items-center pl-6 w-full h-[56px] rounded-lg border-2  ${
        selected ? 'border-main' : 'border-grey-border'
      }`}
    >
      <input
        type="radio"
        id={id}
        className="hidden"
        {...register(name!)}
        value={value}
      />

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
    <div className="w-[120px] h-[48px] bg-grey font-bold flex items-center justify-around select-none">
      <span
        role="button"
        className="hover:text-main cursor-pointer"
        onClick={() => setCount(count - 1)}
      >
        -
      </span>
      <span title="quantity">{count}</span>
      <span
        role="button"
        className="hover:text-main cursor-pointer"
        onClick={() => setCount(count + 1)}
      >
        +
      </span>
    </div>
  )
}

interface CCT extends CounterT {
  className?: string
  title?: string
}

export const CartCounter = ({ count, setCount, className, title }: CCT) => {
  return (
    <div
      className={`w-[96px] h-[32px] bg-grey font-bold flex items-center justify-around select-none ${className}`}
    >
      <span
        role="button"
        title={`${title} -`}
        className="hover:text-main cursor-pointer"
        onClick={() => setCount(count - 1)}
      >
        -
      </span>
      <span title={`${title} quantity`}>{count}</span>
      <span
        role="button"
        title={`${title} +`}
        className="hover:text-main cursor-pointer"
        onClick={() => setCount(count + 1)}
      >
        +
      </span>
    </div>
  )
}
