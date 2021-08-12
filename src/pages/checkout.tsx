import Img from 'next/image'
import { PageWrap } from '@/components/Wrapper'
import { useRouter } from 'next/router'
import { TextField, Radio, Button } from '@/components/UI'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CheckoutT } from '@/utils/types'
import { totalCost } from '@/utils/helper'
import { useAppSelector } from '@/app/hooks'

const Checkout = () => {
  const route = useRouter()
  const { cart } = useAppSelector((state) => state.cart)
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<CheckoutT>()
  const onSubmit: SubmitHandler<CheckoutT> = (data) => console.log(data)

  return (
    <PageWrap title="Checkout" className="bg-grey">
      <div className="container max-w-[1150px] pt-44 pb-12">
        <div
          className="cursor-pointer px-9 lg:px-0 hover:text-main "
          onClick={() => route.back()}
          role="button"
        >
          Go Back
        </div>
        <div className="grid grid-cols-1 gap-5 mt-8 md:grid-cols-5">
          <form
            className="px-12 py-14 rounded-lg bg-white space-y-10 col-span-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-[32px]">Checkout</h1>
            <div className="space-y-5">
              <h3 className="sub-title text-main">Billing Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-5">
                <TextField
                  label="Name"
                  name="name"
                  placeholder="Name"
                  register={register}
                  errors={errors.name}
                />
                <TextField
                  label="Email Address"
                  name="email"
                  placeholder="Email Address"
                  register={register}
                  errors={errors.email}
                  type="email"
                />
                <TextField
                  type="tel"
                  label="Phone Number"
                  name="phone"
                  placeholder="123"
                  register={register}
                  errors={errors.phone}
                />
              </div>
            </div>
            <div className="space-y-5">
              <h3 className="sub-title text-main">shipping info</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <TextField
                  label="Address"
                  name="address"
                  placeholder="Address"
                  errors={errors.address}
                  register={register}
                  className="sm:col-span-2"
                />
                <TextField
                  label="ZIP Code"
                  name="zip"
                  placeholder="ZIP Code"
                  errors={errors.zip}
                  register={register}
                />
                <TextField
                  label="City"
                  name="city"
                  placeholder="City"
                  errors={errors.city}
                  register={register}
                />
                <TextField
                  label="Country"
                  name="country"
                  placeholder="Country"
                  errors={errors.country}
                  register={register}
                />
              </div>
            </div>
            <div className="space-y-5">
              <h3 className="sub-title text-main">Payment Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-5">
                <h4 className="row-span-2 text-[12px]">Payment Method</h4>
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
              </div>
              {watch('paymentMethod') === 'e-money' && (
                <div className="flex flex-col md:flex-row md:space-x-5">
                  <TextField
                    label="e-Money Number"
                    name="e-moneynum"
                    placeholder="1234567"
                    errors={errors['e-moneynum']}
                    register={register}
                    className="w-full"
                  />
                  <TextField
                    label="e-Money PIN"
                    name="e-moneypin"
                    placeholder="1234567"
                    errors={errors['e-moneypin']}
                    register={register}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </form>
          <div className="h-[fit-content] col-span-3 md:col-span-2 px-12 py-8 rounded-lg bg-white ">
            <h3 className="text-[18px] uppercase">Summary</h3>
            <ul className="mt-8 space-y-4">
              {cart.map((item) => (
                <li
                  key={item.slug}
                  className="flex items-center justify-center "
                >
                  <Img
                    src={item.image!.mobile}
                    alt={item.slug}
                    height={64}
                    width={64}
                    className="rounded-lg"
                  />
                  <div className="flex flex-col space-y-1 ml-2">
                    <span className="font-bold text-base uppercase">
                      {item.name}
                    </span>

                    <span className="font-bold text-sm text-grey-shop">
                      $ {item.price! * item.quantity!}
                    </span>
                  </div>
                  <span className="font-bold text-sm text-grey-shop ml-auto">
                    {`x` + item.quantity}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <span className="uppercase">Total</span>
              <span className="float-right text-lg font-bold">
                {`$ ` + totalCost(cart)}
              </span>
            </div>
            <div className="mt-5">
              <span className="uppercase">Shipping</span>
              <span className="float-right text-lg font-bold">$ 50</span>
            </div>
            <div className="mt-5">
              <span className=" font-bold uppercase text-grey-shop">
                Grand Total
              </span>
              <span className="float-right text-lg font-bold text-main">
                $ {totalCost(cart) + 50}
              </span>
            </div>
            <Button width="w-full" className="mt-5" label="Countinue & Pay" />
          </div>
        </div>
      </div>
    </PageWrap>
  )
}

export default Checkout
