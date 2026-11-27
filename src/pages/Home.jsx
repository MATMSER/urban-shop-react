import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../services/productService'

const PAGE_SIZE = 6

export default function Home() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError('No se pudieron cargar los productos. Revisá la conexión con Firebase.'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return products.filter((p) =>
      `${p.name || ''} ${p.category || ''}`.toLowerCase().includes(term)
    )
  }, [products, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const visibleProducts = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleSearch(value) {
    setSearch(value)
    setPage(1)
  }

  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="hero-kicker">NUEVA TEMPORADA</p>
          <h1>Encontrá tu<br /><span>estilo urbano.</span></h1>
          <p>Productos seleccionados para acompañarte todos los días.</p>
          <a href="#catalogo" className="btn btn-light mt-3">Ver productos</a>
        </div>
      </section>
      <main className="container py-5" id="catalogo">
        <div className="section-heading d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-end">
          <div><p className="eyebrow">CATÁLOGO</p><h2 className="fw-bold mb-0">Nuestros productos</h2></div>
          <input className="form-control search-input" type="search" placeholder="Buscar por nombre o categoría..." value={search} onChange={(e) => handleSearch(e.target.value)} aria-label="Buscar productos" />
        </div>
        {loading && <p className="text-center py-5">Cargando productos...</p>}
        {error && <div className="alert alert-warning mt-4">{error}</div>}
        {!loading && !error && visibleProducts.length === 0 && <p className="text-center py-5">No hay productos para mostrar. Cargalos desde el panel de administración.</p>}
        <div className="row g-4 mt-2">
          {visibleProducts.map((product) => <div className="col-12 col-sm-6 col-lg-4" key={product.id}><ProductCard product={product} /></div>)}
        </div>
        {filtered.length > PAGE_SIZE && (
          <div className="d-flex justify-content-center align-items-center gap-3 mt-5">
            <button className="btn btn-outline-dark" disabled={page === 1} onClick={() => setPage(page - 1)}>Anterior</button>
            <span>Página {page} de {totalPages}</span>
            <button className="btn btn-outline-dark" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Siguiente</button>
          </div>
        )}
      </main>
    </>
  )
}