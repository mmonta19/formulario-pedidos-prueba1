import type { Metadata } from 'next';
import { AppHeader } from '@/components/app-header';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pedidos odontológicos',
  description: 'Formulario base para pedidos odontológicos'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <AppHeader />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
