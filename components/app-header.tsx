'use client';

import Link from 'next/link';
import { useOrderStore } from '@/lib/order-store';

export function AppHeader() {
  const {
    state: { cart }
  } = useOrderStore();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="top-header">
      <Link href="/">Formulario de pedidos</Link>
      <Link href="/carrito" className="top-header__cart">
        Carrito ({totalItems})
      </Link>
    </header>
  );
}
