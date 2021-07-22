import { PageWrap } from '@/components/Wrapper'
import { useCartStore } from '@/utils/hooks'
import { useRouter } from 'next/router'
import { TextField, Radio } from '@/components/UI'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CheckoutT } from '@/utils/types'

const Checkout = () => {
  const route = useRouter()
  const { cart } = useCartStore()
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<CheckoutT>()
  const onSubmit: SubmitHandler<CheckoutT> = (data) => console.log(data)

  return (
    <PageWrap title="Checkout" className="bg-grey">
      <div className="container max-w-[1150px] pt-44">
        <div
          className="cursor-pointer px-9 lg:px-0 hover:text-main "
          onClick={() => route.back()}
          role="button"
        >
          Go Back
        </div>
        <form
          className="px-12 py-14 rounded-lg bg-white space-y-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-[32px]">Checkout</h1>
          <div className="space-y-5">
            <h3 className="sub-title text-main">Billing Details</h3>
            <TextField
              label="Name"
              name="name"
              id="name"
              placeholder="Name"
              register={register}
            />
            <TextField
              label="Email Address"
              name="name"
              id="email"
              placeholder="Email Address"
              register={register}
            />
            <TextField
              type="tel"
              label="Phone Number"
              name="name"
              id="phone"
              placeholder="123"
              register={register}
            />
          </div>
          <div className="space-y-5">
            <h3 className="sub-title text-main">shipping info</h3>
            <TextField
              label="Address"
              name="address"
              id="address"
              placeholder="Address"
              register={register}
            />
            <TextField
              label="ZIP Code"
              name="zip"
              id="zip"
              placeholder="ZIP Code"
              register={register}
            />
            <TextField
              label="City"
              name="city"
              id="city"
              placeholder="City"
              register={register}
            />
            <TextField
              label="Country"
              name="country"
              id="country"
              placeholder="Country"
              register={register}
            />
          </div>
          <div className="space-y-5">
            <h3 className="sub-title text-main">Payment Details</h3>
            <Radio
              placeholder="e-Money"
              id="emoney"
              name="paymentMethod"
              value="e-money"
              register={register}
            />
            <Radio
              placeholder="Cash on delivery"
              id="cash"
              name="paymentMethod"
              value="cod"
              register={register}
            />
            {watch('paymentMethod') === 'e-money' && (
              <>
                <TextField
                  label="e-Money Number"
                  name="e-moneynum"
                  id="e-moneynum"
                  placeholder="1234567"
                  register={register}
                />
                <TextField
                  label="e-Money PIN"
                  name="e-moneypin"
                  id="e-moneypin"
                  placeholder="1234567"
                  register={register}
                />
              </>
            )}
          </div>
          <button type="submit">Check</button>
        </form>
      </div>
    </PageWrap>
  )
}

export default Checkout
