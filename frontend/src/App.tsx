
import './App.css'
import Home from './pages/home'
import Layout from './pages/layout'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import { useAuthContext } from './hooks/useAuthContext'

function App() {

  const { user } = useAuthContext()

  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App
