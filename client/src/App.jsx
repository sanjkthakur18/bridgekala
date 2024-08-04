import React, { useState, useEffect } from 'react'
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

  const adminAuthenticated = authenticated && role === 'admin'
  const executiveAuthenticated = authenticated && role === 'executive'

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin-dashboard' element={adminAuthenticated ? <AdminDashboard /> : <Navigate to='/admin-signin' />} />
        <Route path='/executive-dashboard' element={executiveAuthenticated ? <ExecutiveDashboard /> : <Navigate to='/executive-signin' />} />
        <Route path='/executive-signin' element={!executiveAuthenticated ? <ExecutiveSignin /> : <Navigate to='/executive-dashboard' />} />
        <Route path='/executive-signup' element={!executiveAuthenticated ? <ExecutiveSignup /> : <Navigate to='/executive-dashboard' />} />
        <Route path='/admin-signin' element={!adminAuthenticated ? <AdminSignin /> : <Navigate to='/admin-dashboard' />} />
        <Route path='/admin-signup' element={!adminAuthenticated ? <AdminSignup /> : <Navigate to='/admin-dashboard' />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App