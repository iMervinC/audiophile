import {
  useReducer,
  useContext,
  useCallback,
  createContext,
  ReactNode,
  Reducer,
  useMemo,
  useEffect,
} from 'react'
import { CartProduct, InitialCartState, CartAction } from '../types'

interface DispatchActions {
  addToCart: (item: CartProduct) => void
  removeFromCart: (slug: string) => void
  clearCart: () => void
  updateItem: (cartItem: CartProduct) => void
}

export const CartStore = createContext<InitialCartState>({} as InitialCartState)
export const CartDispatch = createContext<DispatchActions>(
  {} as DispatchActions
)

const initialState: InitialCartState = {
  cart: [],
}

const reducer: Reducer<InitialCartState, CartAction> = (state, action) => {
  switch (action.type) {
    case 'PRIME_CART':
      return action.payload
    // === === === === === === === === ===
    case 'ADD':
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
        return { ...state, cart }
      }
    // === === === === === === === === ===
    case 'DELETE':
      const filltered = state.cart.filter((item) => item.slug !== action.slug)

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

  useEffect(() => {
    dispatch({
      type: 'PRIME_CART',
      payload: JSON.parse(localStorage.getItem('cart')!),
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state))
  }, [state])

  //ACTIONS

  const addToCart = useCallback((item: CartProduct) => {
    dispatch({ type: 'ADD', payload: item })
  }, [])

  const removeFromCart = useCallback((slug: string) => {
    dispatch({ type: 'DELETE', slug })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  const updateItem = useCallback((cartItem: CartProduct) => {
    dispatch({ type: 'UPDATE_ITEM', payload: cartItem })
  }, [])

  const memoState = useMemo(() => state, [state])

  return (
    <CartDispatch.Provider
      value={{
        addToCart,
        removeFromCart,
        clearCart,
        updateItem,
      }}
    >
      <CartStore.Provider value={memoState}>{children}</CartStore.Provider>
    </CartDispatch.Provider>
  )
}

export function useCartStore() {
  return useContext(CartStore)
}
export function useCartDispatch() {
  return useContext(CartDispatch)
}
