import { useCart } from '../contexts/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  return (
    <article className="card product-card h-100">
      <div className="product-image-wrap">
        <img
          src={product.image || 'https://placehold.co/600x420?text=Producto'}
          className="card-img-top product-image"
          alt={product.name}
          onError={(event) => { event.currentTarget.src = 'https://placehold.co/600x420?text=Producto' }}
        />
      </div>
      <div className="card-body d-flex flex-column">
        <span className="product-category">{product.category || 'General'}</span>
        <h2 className="h5 mt-2">{product.name}</h2>
        <p className="text-secondary small flex-grow-1">{product.description || 'Producto disponible en nuestra tienda.'}</p>
        <div className="d-flex justify-content-between align-items-center">
          <strong className="product-price">${Number(product.price).toLocaleString('es-AR')}</strong>
          <button className="btn btn-dark btn-sm" onClick={() => addToCart(product)}>Agregar</button>
        </div>
      </div>
    </article>
  )
}