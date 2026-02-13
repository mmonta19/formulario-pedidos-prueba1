import Link from 'next/link';

export default function CatalogPage() {
  return (
    <section className="page-card">
      <h1>Catálogo</h1>
      <p>Base lista para cargar categorías y productos más adelante.</p>
      <p>No se cargaron productos según lo solicitado.</p>
      <Link href="/catalogo/categoria-demo">Ir a ejemplo de categoría</Link>
    </section>
  );
}
