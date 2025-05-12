import { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Tasks from './pages/Tasks'
import Login from './pages/Login'
import Register from "./pages/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"))
  const [savedEmail, setSavedEmail] = useState("Please Log In.")
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"))

    const email = localStorage.getItem("email")
    if (email) {
      setSavedEmail("Hello, " + localStorage.getItem("email"))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    setIsLoggedIn(false)
    setSavedEmail("Please Log In.")
    navigate("/login")
  }

  return (
    <>
    <h1 className='text-center p-3 border-b-1 border-gray-500'>{savedEmail}</h1>
      <div className="bg-gradient-to-r from-black via-gray-900 to-black h-screen">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-center border-4 backdrop-blur-2xl
        border-gray-900 w-100 h-175 container mx-auto p-4 rounded-3xl shadow-lg
        bg-gradient-to-tr from-gray-900 to-gray-950 transform transition-transform duration-300 ease-in-out hover:scale-102">
        <nav className="bg-gray-900 rounded-3xl p-1 border-1 mb-5 border-gray-600">
          {isLoggedIn ? (
            <button onClick={handleLogout}
            className=" w-87 rounded-3xl"
            id='btn'>Log Out</button>
          ) : (
            <>
            <Link to="/register">Register </Link>
            | <Link to="/login">Log In</Link>
            </>
          )}
        </nav>
        <p className="mb-1 text-4xl bg-gr bg-gradient-to-br from-gray-950 to-gray-900 rounded-3xl p-4
        border-1 border-gray-700">Task Manager</p>

        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setSavedEmail={setSavedEmail}/>} />
        </Routes>
        </div>
      </div>
    </>
  )
}

export default App