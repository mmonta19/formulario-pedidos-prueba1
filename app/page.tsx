'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ARGENTINA_PROVINCES } from '@/lib/constants';
import { useOrderStore } from '@/lib/order-store';

type Mode = 'new' | 'existing' | null;

export default function HomePage() {
  const router = useRouter();
  const { setCustomer } = useOrderStore();
  const [mode, setMode] = useState<Mode>(null);
  const [error, setError] = useState('');

  const [newCustomer, setNewCustomer] = useState({ fullName: '', province: '', locality: '' });
  const [existingCustomer, setExistingCustomer] = useState({ name: '', surname: '', dni: '' });

  const handleNewSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!newCustomer.fullName || !newCustomer.province || !newCustomer.locality) {
      setError('Completá todos los campos obligatorios.');
      return;
    }

    setCustomer({ type: 'new', ...newCustomer });
    router.push('/catalogo');
  };

  const handleExistingSubmit = (event: FormEvent) => {
    event.preventDefault();
    const onlyNumbers = /^\d{7,10}$/;
    if (!existingCustomer.name || !existingCustomer.surname || !onlyNumbers.test(existingCustomer.dni)) {
      setError('Completá nombre, apellido y DNI válido (7 a 10 números).');
      return;
    }

    setCustomer({ type: 'existing', ...existingCustomer });
    router.push('/catalogo');
  };

  return (
    <section className="page-card">
      <h1>Inicio</h1>
      <p>Elegí una opción para continuar.</p>

      {mode === null && (
        <div className="button-grid">
          <button type="button" className="big-button" onClick={() => setMode('new')}>
            Cliente nuevo
          </button>
          <button type="button" className="big-button" onClick={() => setMode('existing')}>
            Ya soy cliente
          </button>
        </div>
      )}

      {mode === 'new' && (
        <form onSubmit={handleNewSubmit}>
          <label htmlFor="fullName">Nombre y apellido</label>
          <input
            id="fullName"
            required
            value={newCustomer.fullName}
            onChange={(event) => setNewCustomer((prev) => ({ ...prev, fullName: event.target.value }))}
          />

          <label htmlFor="province">Provincia</label>
          <select
            id="province"
            required
            value={newCustomer.province}
            onChange={(event) => setNewCustomer((prev) => ({ ...prev, province: event.target.value }))}
          >
            <option value="">Seleccionar provincia</option>
            {ARGENTINA_PROVINCES.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>

          <label htmlFor="locality">Localidad</label>
          <input
            id="locality"
            required
            value={newCustomer.locality}
            onChange={(event) => setNewCustomer((prev) => ({ ...prev, locality: event.target.value }))}
          />

          <button type="submit">Continuar a catálogo</button>
        </form>
      )}

      {mode === 'existing' && (
        <form onSubmit={handleExistingSubmit}>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            required
            value={existingCustomer.name}
            onChange={(event) => setExistingCustomer((prev) => ({ ...prev, name: event.target.value }))}
          />

          <label htmlFor="surname">Apellido</label>
          <input
            id="surname"
            required
            value={existingCustomer.surname}
            onChange={(event) => setExistingCustomer((prev) => ({ ...prev, surname: event.target.value }))}
          />

          <label htmlFor="dni">DNI</label>
          <input
            id="dni"
            required
            inputMode="numeric"
            pattern="[0-9]{7,10}"
            value={existingCustomer.dni}
            onChange={(event) => setExistingCustomer((prev) => ({ ...prev, dni: event.target.value.replace(/\D/g, '') }))}
          />

          <button type="submit">Continuar a catálogo</button>
        </form>
      )}

      {error && <p className="error">{error}</p>}
    </section>
  );
}
