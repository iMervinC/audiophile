import {
  useReducer,
  createContext,
  useContext,
  ReactNode,
  Reducer,
} from 'react'
import { CartProduct, InitialCartState, CartAction } from '../types'

interface DispatchActions {
  addToCart: (item: CartProduct) => void
  removeFromCart: (index: number) => void
  clearCart: () => void
  updateItem: (cartItem: CartProduct) => void
}

const CartStore = createContext<InitialCartState>({} as InitialCartState)
const CartDispatch = createContext<DispatchActions>({} as DispatchActions)

const initialState: InitialCartState = {
  cart: [],
}

const reducer: Reducer<InitialCartState, CartAction> = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return { cart: [...state.cart, action.payload] }
    // === === === === === === === === ===
    case 'DELETE':
      const filltered = state.cart.filter((_, index) => index !== action.id)

      return {
        ...state,
        cart: [...filltered],
      }
    // === === === === === === === === ===
    case 'UPDATE_ITEM':
      const updateIdex = state.cart.findIndex(
        (item) => item.slug === action.payload.slug
      )
      const updateCart = state.cart
      updateCart[updateIdex] = action.payload
      return {
        ...state,
        cart: updateCart,
      }
    // === === === === === === === === ===
    case 'CLEAR_CART':
      return { cart: [] }
    // === === === === === === === === ===

    default:
      return state
  }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addToCart = (item: CartProduct) => {
    dispatch({ type: 'ADD', payload: item })
  }

  const removeFromCart = (index: number) => {
    dispatch({ type: 'DELETE', id: index })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const updateItem = (cartItem: CartProduct) => {
    dispatch({ type: 'UPDATE_ITEM', payload: cartItem })
  }

  return (
    <CartDispatch.Provider
      value={{
        addToCart,
        removeFromCart,
        clearCart,
        updateItem,
      }}
    >
      <CartStore.Provider value={state}>{children}</CartStore.Provider>
    </CartDispatch.Provider>
  )
}

export function useCartStore() {
  return useContext(CartStore)
}
export function useCartDispatch() {
  return useContext(CartDispatch)
}
