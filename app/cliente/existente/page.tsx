'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOrderStore } from '@/lib/order-store';

export default function ClienteExistentePage() {
  const router = useRouter();
  const { setClienteExistente } = useOrderStore();
  const [error, setError] = useState('');
  const [form, setForm] = useState({ nombre: '', apellido: '', dni: '' });

  const dniValido = /^\d{7,10}$/.test(form.dni);
  const isValid = useMemo(
    () => Boolean(form.nombre.trim() && form.apellido.trim() && dniValido),
    [form, dniValido]
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!isValid) {
      setError('Completá nombre, apellido y DNI válido (7 a 10 números).');
      return;
    }

    setClienteExistente({
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      dni: form.dni
    });
    router.push('/catalogo');
  };

  return (
    <section className="page-card">
      <h1>Ya soy cliente</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          required
          value={form.nombre}
          onChange={(event) => setForm((prev) => ({ ...prev, nombre: event.target.value }))}
        />

        <label htmlFor="apellido">Apellido</label>
        <input
          id="apellido"
          required
          value={form.apellido}
          onChange={(event) => setForm((prev) => ({ ...prev, apellido: event.target.value }))}
        />

        <label htmlFor="dni">DNI</label>
        <input
          id="dni"
          required
          inputMode="numeric"
          pattern="[0-9]{7,10}"
          value={form.dni}
          onChange={(event) => setForm((prev) => ({ ...prev, dni: event.target.value.replace(/\D/g, '') }))}
        />

        <button type="submit" disabled={!isValid}>
          Continuar a catálogo
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </section>
  );
}
