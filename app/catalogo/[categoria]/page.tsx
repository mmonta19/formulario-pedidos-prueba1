export default function CategoryPage({ params }: { params: { categoria: string } }) {
  return (
    <section className="page-card">
      <h1>Categoría: {decodeURIComponent(params.categoria)}</h1>
      <p>Vista preparada para incorporar productos de la categoría seleccionada.</p>
    </section>
  );
}
