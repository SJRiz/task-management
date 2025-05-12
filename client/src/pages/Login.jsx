import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
        const res = await axios.post("http://127.0.0.1:5000/login", { email, password })
        const token = res.data.access_token
        localStorage.setItem("token", token)
        setIsLoggedIn(true)
        navigate("/") // redirect to home after login
    } catch (err) {
        alert("Login failed")
    }
  }

  return (
    <div>
        <h2>Log In</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <br/>
          <button type="submit">Login</button>
        </form>
    </div>
  )
}