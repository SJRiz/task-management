import { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Tasks from './pages/Tasks'
import Login from './pages/Login'
import Register from "./pages/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"))
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    navigate("/login")
  }

  return (
    <>
      <nav>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Log Out</button>
        ) : (
          <>
          <Link to="/register">Register </Link>
          | <Link to="/login">Log In</Link>
          </>
        )}
      </nav>
      <h1>Task Manager</h1>

      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </>
  )
}

export default App