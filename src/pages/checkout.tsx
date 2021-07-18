import { PageWrap } from '@/components/Wrapper'
import { useCartStore } from '@/utils/hooks'
import { useRouter } from 'next/router'
import { TextField } from '@/components/UI'

const Checkout = () => {
  const route = useRouter()
  const { cart } = useCartStore()
  return (
    <PageWrap title="Checkout">
      <div
        className="cursor-pointer px-9 lg:px-0 hover:text-main "
        onClick={() => route.back()}
        role="button"
      >
        Go Back
      </div>
      <form>
        <h1>Checkout</h1>
        <div>
          <h3 className="sub-title">Billing Details</h3>
          <TextField label="Name" name="billing" id="name" placeholder="Name" />
          <TextField
            label="Email Address"
            name="billing"
            id="email"
            placeholder="Email Address"
          />
          <TextField
            type="tel"
            label="Phone Number"
            name="billing"
            id="phone"
            placeholder="123"
          />
        </div>
        <div>
          <h3 className="sub-title">shipping info</h3>
          <TextField
            label="Address"
            name="shipping"
            id="address"
            placeholder="Address"
          />
          <TextField
            label="ZIP Code"
            name="shipping"
            id="zipcode"
            placeholder="ZIP Code"
          />
          <TextField
            label="City"
            name="shipping"
            id="city"
            placeholder="City"
          />
          <TextField
            label="Country"
            name="shipping"
            id="country"
            placeholder="Country"
          />
        </div>
      </form>
    </PageWrap>
  )
}

export default Checkout
