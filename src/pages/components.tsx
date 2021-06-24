import { useState } from 'react'
import { Button, ButtonArrow } from '@/components/UI/Buttons'
import { TextField, Radio, Counter } from '@/components/UI/FormInputs'

const Components = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="mb-5">
        <h2 className="mb-3">Buttons</h2>
        <Button label="See Product" />
        <Button label="See Product" variant="bnw" />
        <ButtonArrow />
      </div>
      <form className="mb-5">
        <h2 className="mb-3">Feilds</h2>
        <TextField label="Name" placeholder="Insert your name" />
        <Radio placeholder="e-Money" id="emoney" name="payment" />
        <Radio placeholder="Cash" id="cash" name="payment" />
        <Counter count={count} setCount={setCount} />
      </form>
    </>
  )
}

export default Components
