'use client';

import { OrderProvider } from '@/lib/order-store';

export function Providers({ children }: { children: React.ReactNode }) {
  return <OrderProvider>{children}</OrderProvider>;
}
