'use client';

import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

export type NewCustomer = {
  type: 'new';
  fullName: string;
  province: string;
  locality: string;
};

export type ExistingCustomer = {
  type: 'existing';
  name: string;
  surname: string;
  dni: string;
};

export type CustomerData = NewCustomer | ExistingCustomer | null;

export type CartItem = {
  id: string;
  quantity: number;
};

export type OrderState = {
  customer: CustomerData;
  cart: CartItem[];
  needs_review: boolean;
};

type OrderAction =
  | { type: 'SET_CUSTOMER'; payload: CustomerData }
  | { type: 'SAVE_DRAFT' }
  | { type: 'ADD_CART_ITEM'; payload: CartItem }
  | { type: 'CLEAR_ORDER' }
  | { type: 'HYDRATE'; payload: OrderState };

const STORAGE_KEY = 'odontology_order_state_v1';

const initialState: OrderState = {
  customer: null,
  cart: [],
  needs_review: false
};

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case 'SET_CUSTOMER':
      return {
        ...state,
        customer: action.payload
      };
    case 'ADD_CART_ITEM': {
      const existing = state.cart.find((item) => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + action.payload.quantity } : item
          )
        };
      }

      return {
        ...state,
        cart: [...state.cart, action.payload]
      };
    }
    case 'SAVE_DRAFT':
      return {
        ...state
      };
    case 'HYDRATE':
      return action.payload;
    case 'CLEAR_ORDER':
      return initialState;
    default:
      return state;
  }
}

type OrderContextType = {
  state: OrderState;
  setCustomer: (customer: CustomerData) => void;
  saveDraft: () => void;
};

const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  useEffect(() => {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    if (!rawValue) return;

    try {
      const parsed = JSON.parse(rawValue) as OrderState;
      dispatch({ type: 'HYDRATE', payload: parsed });
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo(
    () => ({
      state,
      setCustomer: (customer: CustomerData) => dispatch({ type: 'SET_CUSTOMER', payload: customer }),
      saveDraft: () => dispatch({ type: 'SAVE_DRAFT' })
    }),
    [state]
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrderStore() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrderStore must be used within OrderProvider');
  }

  return context;
}
