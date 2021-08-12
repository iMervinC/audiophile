import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartProduct, InitialCartState } from '@/utils/types'

const initialState: InitialCartState = {
  cart: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    primeCart(state, action: PayloadAction<InitialCartState>) {
      state = action.payload
    },
    addToCart(state, action: PayloadAction<CartProduct>) {
      const exist = state.cart.findIndex(
        (item) => item.slug === action.payload.slug
      )

      const cart = state.cart

      if (exist < 0) {
        return { cart: [...cart, action.payload] }
      } else {
        cart[exist] = {
          ...action.payload,
          quantity: cart[exist].quantity! + action.payload.quantity!,
        }
        state = { ...state, cart }
      }
    },
    deleteFromCart(state, action: PayloadAction<string>) {
      const filltered = state.cart.filter(
        (item) => item.slug !== action.payload
      )

      state = {
        ...state,
        cart: [...filltered],
      }
    },
    updateCart(state, action: PayloadAction<CartProduct>) {
      const updateIdex = state.cart.findIndex(
        (item) => item.slug === action.payload.slug
      )
      const updateCart = state.cart
      updateCart[updateIdex] = action.payload
      state.cart = updateCart
    },
    clearCart(state) {
      state.cart = []
    },
  },
})

export const { primeCart, addToCart, deleteFromCart, clearCart, updateCart } =
  cartSlice.actions
export default cartSlice.reducer
