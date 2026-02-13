'use client';

import Link from 'next/link';
import { useOrderStore } from '@/lib/order-store';

export default function CartPage() {
  const {
    state: { cart }
  } = useOrderStore();

  return (
    <section className="page-card">
      <h1>Carrito</h1>
      <p>Items en carrito: {cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
      <Link href="/resumen">Ir al resumen</Link>
    </section>
  );
}
