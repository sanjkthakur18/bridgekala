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
  const token = localStorage.getItem('token')
  const { authenticated } = useUserContext()

  const adminAuthenticated = authenticated && localStorage.getItem('role') === 'admin'
  const executiveAuthenticated = authenticated && localStorage.getItem('role') === 'executive'

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin-dashboard' element={token && adminAuthenticated ? <AdminDashboard /> : <Navigate to='/admin-signin' />} />
        <Route path='/executive-dashboard' element={token && executiveAuthenticated ? <ExecutiveDashboard /> : <Navigate to='/executive-signin' />} />
        <Route path='/executive-signin' element={token && executiveAuthenticated ? <Navigate to='/executive-dashboard' /> : <ExecutiveSignin />} />
        <Route path='/executive-signup' element={token && executiveAuthenticated ? <Navigate to='/executive-dashboard' /> : <ExecutiveSignup />} />
        <Route path='/admin-signin' element={token && adminAuthenticated ? <Navigate to='/admin-dashboard' /> : <AdminSignin />} />
        <Route path='/admin-signup' element={token && adminAuthenticated ? <Navigate to='/admin-dashboard' /> : <AdminSignup />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App