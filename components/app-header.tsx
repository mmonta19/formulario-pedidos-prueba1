'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useOrderStore } from '@/lib/order-store';

const ONBOARDING_ROUTES = ['/cliente/nuevo', '/cliente/existente'];

export function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const {
    state: { cart, tipoCliente },
    saveDraft
  } = useOrderStore();

  const isOnboarding = ONBOARDING_ROUTES.includes(pathname);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="top-header">
      {isOnboarding ? (
        <button type="button" className="header-link" onClick={() => router.push('/')}>
          Atrás
        </button>
      ) : (
        <Link href="/" className="header-link">
          Inicio
        </Link>
      )}

      <span className="header-title">Formulario de pedidos</span>

      {isOnboarding ? (
        <button
          type="button"
          className="top-header__cart"
          onClick={() => {
            saveDraft();
            window.alert('Borrador guardado en este dispositivo.');
          }}
        >
          Guardar borrador
        </button>
      ) : tipoCliente ? (
        <Link href="/carrito" className="top-header__cart">
          Carrito ({totalItems})
        </Link>
      ) : (
        <span className="header-placeholder" aria-hidden="true" />
      )}
    </header>
  );
}
