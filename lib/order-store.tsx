'use client';

import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

export type TipoCliente = 'nuevo' | 'existente' | null;

export type DatosClienteNuevo = {
  nombre: string;
  apellido: string;
  provincia: string;
  localidad: string;
};

export type DatosClienteExistente = {
  nombre: string;
  apellido: string;
  dni: string;
};

export type CartItem = {
  id: string;
  quantity: number;
};

export type OrderState = {
  tipoCliente: TipoCliente;
  datosCliente: DatosClienteNuevo | DatosClienteExistente | null;
  cart: CartItem[];
  needs_review: boolean;
};

type OrderAction =
  | { type: 'SET_CLIENTE_NUEVO'; payload: DatosClienteNuevo }
  | { type: 'SET_CLIENTE_EXISTENTE'; payload: DatosClienteExistente }
  | { type: 'SAVE_DRAFT' }
  | { type: 'HYDRATE'; payload: OrderState };

const STORAGE_KEY = 'odontology_order_state_v1';

const initialState: OrderState = {
  tipoCliente: null,
  datosCliente: null,
  cart: [],
  needs_review: false
};

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case 'SET_CLIENTE_NUEVO':
      return {
        ...state,
        tipoCliente: 'nuevo',
        datosCliente: action.payload
      };
    case 'SET_CLIENTE_EXISTENTE':
      return {
        ...state,
        tipoCliente: 'existente',
        datosCliente: action.payload
      };
    case 'SAVE_DRAFT':
      return { ...state };
    case 'HYDRATE':
      return action.payload;
    default:
      return state;
  }
}

type OrderContextType = {
  state: OrderState;
  setClienteNuevo: (data: DatosClienteNuevo) => void;
  setClienteExistente: (data: DatosClienteExistente) => void;
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
      setClienteNuevo: (data: DatosClienteNuevo) => dispatch({ type: 'SET_CLIENTE_NUEVO', payload: data }),
      setClienteExistente: (data: DatosClienteExistente) => dispatch({ type: 'SET_CLIENTE_EXISTENTE', payload: data }),
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
