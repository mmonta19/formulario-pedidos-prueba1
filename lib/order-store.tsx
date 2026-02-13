'use client';

import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';


export type CartItem = {
  id: string;
  quantity: number;
};

export type OrderState = {

  cart: CartItem[];
  needs_review: boolean;
};

type OrderAction =

  | { type: 'HYDRATE'; payload: OrderState };

const STORAGE_KEY = 'odontology_order_state_v1';

const initialState: OrderState = {

  cart: [],
  needs_review: false
};

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {

    default:
      return state;
  }
}

type OrderContextType = {
  state: OrderState;

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
