import { useState } from 'react'
import api from '../api'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const nav = useNavigate()
  const { login } = useAuth()

  const submit = async (e) => {
    e.preventDefault(); setError('')
    try {
      const { data } = await api.post('/api/auth/login', form)
      login(data); nav('/me')
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials')
    }
  }

  return (
    <div className='card'>
      <h2>Login</h2>
      <form onSubmit={submit} className='form'>
        <input placeholder='Email' value={form.email}
          onChange={(e)=>setForm({...form, email:e.target.value})}/>
        <input placeholder='Password' type='password' value={form.password}
          onChange={(e)=>setForm({...form, password:e.target.value})}/>
        <button>Login</button>
      </form>
      {error && <p className='error'>{error}</p>}
      <p>No account? <Link to='/register'>Register</Link></p>
    </div>
  )
}