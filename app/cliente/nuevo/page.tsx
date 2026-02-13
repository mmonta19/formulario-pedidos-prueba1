'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PROVINCIAS_ARGENTINA } from '@/data/provincias';
import { useOrderStore } from '@/lib/order-store';

export default function ClienteNuevoPage() {
  const router = useRouter();
  const { setClienteNuevo } = useOrderStore();
  const [error, setError] = useState('');
  const [form, setForm] = useState({ nombre: '', apellido: '', provincia: '', localidad: '' });

  const isValid = useMemo(
    () => Boolean(form.nombre.trim() && form.apellido.trim() && form.provincia && form.localidad.trim()),
    [form]
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!isValid) {
      setError('Completá todos los campos obligatorios.');
      return;
    }

    setClienteNuevo({
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      provincia: form.provincia,
      localidad: form.localidad.trim()
    });
    router.push('/catalogo');
  };

  return (
    <section className="page-card">
      <h1>Cliente nuevo</h1>
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

        <label htmlFor="provincia">Provincia</label>
        <select
          id="provincia"
          required
          value={form.provincia}
          onChange={(event) => setForm((prev) => ({ ...prev, provincia: event.target.value }))}
        >
          <option value="">Seleccionar provincia</option>
          {PROVINCIAS_ARGENTINA.map((provincia) => (
            <option key={provincia} value={provincia}>
              {provincia}
            </option>
          ))}
        </select>

        <label htmlFor="localidad">Localidad</label>
        <input
          id="localidad"
          required
          value={form.localidad}
          onChange={(event) => setForm((prev) => ({ ...prev, localidad: event.target.value }))}
        />

        <button type="submit" disabled={!isValid}>
          Continuar a catálogo
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </section>
  );
}
