import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { IoMdCloseCircle, IoMdArrowBack } from 'react-icons/io'
import { FaCheckCircle } from 'react-icons/fa'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'
import { useUserContext } from '../context/AuthContext'

const AdminSignup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)
    const { AdminSignup, isLoading, signupError, message, } = useUserContext()

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await AdminSignup(formData)
            setFormData({ name: '', email: '', password: '' })
            console.log('Admin registered successfully')
        } catch (err) {
            console.error('Signup failed', err)
        }
    }

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-[#453691]">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center text-black">
                    <Link to='/' className='flex items-center gap-4 text-[#453691]'><IoMdArrowBack className='text-green-600' /> Go back to Home</Link>
                    Welcome to <span className='text-[#453691]'>Stock Panel - Admin!</span>
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="sr-only">Full name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full name" required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#453691]" />
                    </div>
                    <div>
                        <label className="sr-only">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your email" required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#453691]" />
                    </div>
                    <div className="relative">
                        <label className="sr-only">Password</label>
                        <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#453691]" />
                        <button type="button" onClick={togglePassword} className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 focus:outline-none" >
                            {showPassword ? <VscEyeClosed /> : <VscEye />}
                        </button>
                    </div>
                    <button type="submit" className="w-full py-2 text-white bg-[#453691] rounded hover:bg-[#877CCA] focus:outline-none focus:ring-2 focus:ring-[#877CCA] focus:ring-opacity-50" >
                        {isLoading ? 'Signing up...' : 'Sign up'}
                    </button>
                    {signupError && <p className="flex items-center justify-center gap-4 text-red-500"><IoMdCloseCircle /> {signupError}</p>}
                    {message && <p className="flex items-center justify-center gap-4 text-green-500"><FaCheckCircle /> {message}</p>}
                </form>
                <p className="text-center text-gray-600">
                    Already have an account? <NavLink to="/admin-signin" className="text-[#453691] hover:underline">Log in.</NavLink>
                </p>
            </div>
        </div>
    )
}

export default AdminSignup