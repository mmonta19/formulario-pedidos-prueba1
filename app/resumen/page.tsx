'use client';

import { useOrderStore } from '@/lib/order-store';

export default function SummaryPage() {
  const {

  } = useOrderStore();

  return (
    <section className="page-card">
      <h1>Resumen</h1>

    </section>
  );
}
