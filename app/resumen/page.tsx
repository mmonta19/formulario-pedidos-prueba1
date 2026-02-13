'use client';

import { useOrderStore } from '@/lib/order-store';

export default function SummaryPage() {
  const {
    state: { tipoCliente, datosCliente, cart, needs_review }
  } = useOrderStore();

  return (
    <section className="page-card">
      <h1>Resumen</h1>
      <pre>{JSON.stringify({ tipoCliente, datosCliente, cart, needs_review }, null, 2)}</pre>
    </section>
  );
}
