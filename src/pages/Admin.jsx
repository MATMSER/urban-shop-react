import { useEffect, useState } from 'react'
import { createProduct, deleteProduct, getProducts, updateProduct } from '../services/productService'

const emptyForm = { name: '', category: '', price: '', image: '', description: '' }

export default function Admin() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function loadProducts() {
    setLoading(true)
    try { setProducts(await getProducts()); setError('') }
    catch { setError('No se pudieron obtener los productos. Revisá Firebase y las reglas de Firestore.') }
    finally { setLoading(false) }
  }

  useEffect(() => { loadProducts() }, [])

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setError('')
    if (!form.name.trim() || !form.category.trim() || Number(form.price) <= 0) {
      setError('Completá nombre, categoría y un precio mayor que cero.')
      return
    }
    const product = { ...form, name: form.name.trim(), category: form.category.trim(), price: Number(form.price) }
    setSaving(true)
    try {
      if (editingId) await updateProduct(editingId, product)
      else await createProduct(product)
      setForm(emptyForm)
      setEditingId(null)
      setMessage(editingId ? 'Producto actualizado.' : 'Producto creado correctamente.')
      await loadProducts()
    } catch {
      setError('No se pudo guardar. Verificá que estés conectado y autenticado en Firebase.')
    } finally { setSaving(false) }
  }

  function startEdit(product) {
    setEditingId(product.id)
    setForm({ name: product.name || '', category: product.category || '', price: String(product.price || ''), image: product.image || '', description: product.description || '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleDelete(product) {
    if (!window.confirm(`¿Seguro que querés eliminar "${product.name}"?`)) return
    try {
      await deleteProduct(product.id)
      setMessage('Producto eliminado.')
      await loadProducts()
    } catch { setError('No se pudo eliminar el producto.') }
  }

  function cancelEdit() {
    setEditingId(null)
    setForm(emptyForm)
  }

  return (
    <main className="container py-5">
      <p className="eyebrow">ADMINISTRACIÓN</p>
      <h1 className="fw-bold mb-4">Panel de productos</h1>
      <div className="admin-form-card mb-5">
        <h2 className="h4 mb-3">{editingId ? 'Editar producto' : 'Nuevo producto'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6"><label className="form-label" htmlFor="name">Nombre *</label><input id="name" name="name" className="form-control" value={form.name} onChange={handleChange} required /></div>
            <div className="col-md-6"><label className="form-label" htmlFor="category">Categoría *</label><input id="category" name="category" className="form-control" value={form.category} onChange={handleChange} required /></div>
            <div className="col-md-4"><label className="form-label" htmlFor="price">Precio *</label><input id="price" name="price" type="number" min="0.01" step="0.01" className="form-control" value={form.price} onChange={handleChange} required /></div>
            <div className="col-md-8"><label className="form-label" htmlFor="image">URL de imagen (opcional)</label><input id="image" name="image" type="url" className="form-control" value={form.image} onChange={handleChange} placeholder="https://..." /></div>
            <div className="col-12"><label className="form-label" htmlFor="description">Descripción</label><textarea id="description" name="description" rows="2" className="form-control" value={form.description} onChange={handleChange} /></div>
          </div>
          {message && <div className="alert alert-success mt-3 py-2">{message}</div>}
          {error && <div className="alert alert-danger mt-3 py-2">{error}</div>}
          <div className="d-flex gap-2 mt-3"><button className="btn btn-dark" disabled={saving}>{saving ? 'Guardando...' : editingId ? 'Guardar cambios' : 'Crear producto'}</button>{editingId && <button type="button" className="btn btn-outline-secondary" onClick={cancelEdit}>Cancelar</button>}</div>
        </form>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3"><h2 className="h4 mb-0">Productos cargados</h2><button className="btn btn-sm btn-outline-dark" onClick={loadProducts}>Actualizar lista</button></div>
      {loading ? <p>Cargando...</p> : products.length === 0 ? <p className="text-secondary">Todavía no hay productos cargados.</p> : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead><tr><th>Producto</th><th>Categoría</th><th>Precio</th><th>Acciones</th></tr></thead>
            <tbody>{products.map((product) => <tr key={product.id}><td>{product.name}</td><td>{product.category}</td><td>${Number(product.price).toLocaleString('es-AR')}</td><td><div className="d-flex gap-2"><button className="btn btn-sm btn-outline-primary" onClick={() => startEdit(product)}>Editar</button><button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(product)}>Eliminar</button></div></td></tr>)}</tbody>
          </table>
        </div>
      )}
    </main>
  )
}