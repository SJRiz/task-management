import { Routes, Route, Link } from 'react-router-dom'
import Tasks from './pages/Tasks'
import Login from './pages/Login'

function App() {
  return (
    <>
      <nav>
        <Link to="/">Tasks</Link> | <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
