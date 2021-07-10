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
  quantityChange: (type: 'Add' | 'Minus', index: number) => void
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
    case 'ADD_QUANTITY':
      state.cart[action.id].quantity! += 1

      return {
        ...state,
      }
    // === === === === === === === === ===
    case 'SUBTRACT_QUANTITY':
      state.cart[action.id].quantity = Math.max(
        0,
        (state.cart[action.id].quantity! -= 1)
      )

      return {
        ...state,
      }
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

  const quantityChange = (type: 'Add' | 'Minus', index: number) => {
    if (type === 'Add') {
      dispatch({ type: 'ADD_QUANTITY', id: index })
    } else if (type === 'Minus') {
      dispatch({ type: 'SUBTRACT_QUANTITY', id: index })
    }
  }

  return (
    <CartDispatch.Provider
      value={{ addToCart, removeFromCart, quantityChange }}
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
