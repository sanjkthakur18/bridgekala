import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import ExecutiveSignin from './pages/ExecutiveSignin'
import ExecutiveSignup from './pages/ExecutiveSignup'
import AdminDashboard from './pages/AdminDashboard'
import ExecutiveDashboard from './pages/ExecutiveDashboard'
import AdminSignin from './pages/AdminSignin'
import AdminSignup from './pages/AdminSignup'
import { useUserContext } from './context/AuthContext'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

const App = () => {
  const { authenticated } = useUserContext()
  const role = localStorage.getItem('role')

  const adminAuthenticated = authenticated && role === 'admin'
  const executiveAuthenticated = authenticated && role === 'executive'

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin-dashboard' element={adminAuthenticated ? <AdminDashboard /> : <Navigate to='/admin-signin' />} />
        <Route path='/executive-dashboard' element={executiveAuthenticated ? <ExecutiveDashboard /> : <Navigate to='/executive-signin' />} />
        <Route path='/executive-signin' element={executiveAuthenticated ? <Navigate to='/executive-dashboard' /> : <ExecutiveSignin />} />
        <Route path='/executive-signup' element={<ExecutiveSignup />} />
        <Route path='/admin-signin' element={adminAuthenticated ? <Navigate to='/admin-dashboard' /> : <AdminSignin />} />
        <Route path='/admin-signup' element={<AdminSignup />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
