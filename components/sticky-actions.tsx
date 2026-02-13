'use client';

import { useRouter } from 'next/navigation';
import { useOrderStore } from '@/lib/order-store';

export function StickyActions() {
  const router = useRouter();
  const { saveDraft } = useOrderStore();

  return (
    <div className="sticky-actions">
      <button type="button" className="secondary" onClick={() => router.back()}>
        Atrás
      </button>
      <button
        type="button"
        onClick={() => {
          saveDraft();
          window.alert('Borrador guardado en este dispositivo.');
        }}
      >
        Guardar borrador
      </button>
    </div>
  );
}
