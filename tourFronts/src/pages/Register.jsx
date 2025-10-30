import { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const nav = useNavigate()
  const { login } = useAuth()

  const submit = async (e) => {
    e.preventDefault(); setError('')
    try {
      const { data } = await api.post('/api/auth/register', form)
      login(data); nav('/me')
    } catch (err) {
      setError(err.response?.data?.error || err.message)
    }
  }

  return (
    <div className='card'>
      <h2>Register</h2>
      <form onSubmit={submit} className='form'>
        <input placeholder='Name' value={form.name}
          onChange={(e)=>setForm({...form, name:e.target.value})}/>
        <input placeholder='Email' value={form.email}
          onChange={(e)=>setForm({...form, email:e.target.value})}/>
        <input placeholder='Password' type='password' value={form.password}
          onChange={(e)=>setForm({...form, password:e.target.value})}/>
        <button>Sign up</button>
      </form>
      {error && <p className='error'>{error}</p>}
    </div>
  )
}