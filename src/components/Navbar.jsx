import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark site-navbar">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">URBAN<span>SHOP</span></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-label="Abrir menú">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
            <NavLink className="nav-link" to="/">Tienda</NavLink>
            <NavLink className="nav-link" to="/carrito">Carrito ({totalItems})</NavLink>
            {user ? (
              <>
                <NavLink className="nav-link" to="/admin">Panel</NavLink>
                <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>Cerrar sesión</button>
              </>
            ) : <NavLink className="nav-link" to="/login">Ingresar</NavLink>}
          </div>
        </div>
      </div>
    </nav>
  )
}