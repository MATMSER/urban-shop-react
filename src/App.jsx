import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Admin from './pages/Admin'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="*" element={<main className="container py-5"><h1>Página no encontrada</h1><a href="/">Volver al inicio</a></main>} />
      </Routes>
      <footer className="site-footer"><div className="container d-flex flex-column flex-md-row justify-content-between gap-2"><span>URBAN SHOP</span><span>Proyecto final de React · 2026</span></div></footer>
    </>
  )
}