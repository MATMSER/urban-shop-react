import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const { login, register } = useAuth()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    if (password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres.')
    setLoading(true)
    try {
      if (mode === 'login') await login(email, password)
      else await register(email, password)
      navigate('/admin')
    } catch (err) {
      const messages = {
        'auth/invalid-credential': 'Correo o contraseña incorrectos.',
        'auth/email-already-in-use': 'Ese correo ya está registrado.',
        'auth/invalid-email': 'El correo no tiene un formato válido.',
        'auth/weak-password': 'La contraseña es demasiado débil.'
      }
      setError(messages[err.code] || 'No se pudo completar la operación. Revisá los datos e intentá nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container auth-container">
      <div className="auth-card">
        <p className="eyebrow">{mode === 'login' ? 'BIENVENIDO' : 'CREÁ TU CUENTA'}</p>
        <h1 className="h2 fw-bold">{mode === 'login' ? 'Ingresar' : 'Registrarse'}</h1>
        <p className="text-secondary">Accedé para administrar los productos de la tienda.</p>
        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="email">Correo electrónico</label>
          <input id="email" className="form-control mb-3" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className="form-label" htmlFor="password">Contraseña</label>
          <input id="password" className="form-control mb-3" type="password" minLength="6" required value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <button className="btn btn-dark w-100" disabled={loading}>{loading ? 'Procesando...' : mode === 'login' ? 'Ingresar' : 'Crear cuenta'}</button>
        </form>
        <p className="small mt-3 mb-0">
          {mode === 'login' ? '¿No tenés cuenta? ' : '¿Ya tenés cuenta? '}
          <button className="link-button" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}>
            {mode === 'login' ? 'Registrate' : 'Ingresá'}
          </button>
        </p>
        <Link to="/" className="small d-inline-block mt-3">Volver a la tienda</Link>
      </div>
    </main>
  )
}