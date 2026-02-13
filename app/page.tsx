import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="page-card">
      <h1>Inicio</h1>
      <p>Elegí una opción para continuar.</p>

      <div className="button-grid">
        <Link href="/cliente/nuevo" className="big-button">
          Cliente nuevo
        </Link>
        <Link href="/cliente/existente" className="big-button">
          Ya soy cliente
        </Link>
      </div>
    </section>
  );
}
