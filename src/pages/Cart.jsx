import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

export default function Cart() {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart()
  return (
    <main className="container py-5 min-page">
      <p className="eyebrow">TU COMPRA</p>
      <h1 className="fw-bold mb-4">Carrito</h1>
      {cart.length === 0 ? (
        <div className="empty-state"><p>Tu carrito está vacío.</p><Link to="/" className="btn btn-dark">Ir a la tienda</Link></div>
      ) : (
        <>
          <div className="list-group mb-4">
            {cart.map((item) => (
              <div className="list-group-item d-flex flex-wrap justify-content-between align-items-center gap-3" key={item.id}>
                <div><strong>{item.name}</strong><div className="small text-secondary">Cantidad: {item.quantity}</div></div>
                <div className="d-flex align-items-center gap-3"><strong>${(item.price * item.quantity).toLocaleString('es-AR')}</strong><button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(item.id)}>Quitar</button></div>
              </div>
            ))}
          </div>
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <button className="btn btn-outline-danger" onClick={clearCart}>Vaciar carrito</button>
            <h2 className="h4">Total: ${totalPrice.toLocaleString('es-AR')}</h2>
          </div>
          <p className="small text-secondary mt-3">Proyecto académico: el carrito permite gestionar los productos seleccionados; no procesa pagos reales.</p>
        </>
      )}
    </main>
  )
}