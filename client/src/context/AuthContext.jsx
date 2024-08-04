import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

const UserContext = createContext(undefined)

export const UserProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [loginError, setLoginError] = useState(null)
    const [signupError, setSignupError] = useState(null)
    const [authenticated, setAuthenticated] = useState(!localStorage.getItem('token'))

    const getToken = () => localStorage.getItem('token')

    useEffect(() => {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('role')
        if (token && role) {
          setAuthenticated(true)
        } else {
          setAuthenticated(false)
        }
      }, [])

    const login = async (formData) => {
        setIsLoading(true)
        setLoginError(null)
        try {
            const response = await axios.post('http://127.0.0.1:3500/api/login', formData)
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('name', response.data.name)
                localStorage.setItem('role', response.data.role)
                localStorage.setItem('userId', response.data._id)
                setAuthenticated(true)
            }
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setLoginError(err.response.data.error.wrngEmail)
            } else if (err.response && err.response.status === 400) {
                setLoginError(err.response.data.error.wrngPass)
            } else {
                setLoginError('Login failed. Please try again.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const signup = async (formData) => {
        setIsLoading(true)
        setSignupError(null)
        setMessage(null)
        try {
            const response = await axios.post('http://127.0.0.1:3500/api/register', formData)
            if (response.status === 200) {
                setMessage('User registered.')
                return response.data
            }
        } catch (err) {
            if (err.response && err.response.status === 409) {
                setSignupError(err.response.data.error.userErr)
            } else {
                setSignupError('Signup failed. Please try again.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const logout = async () => {
        const token = getToken()
        try {
            await axios.patch('http://127.0.0.1:3500/api/logout', {
                headers: { Authorization: `Bearer ${token}` }
            })
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            setAuthenticated(false)
        } catch (error) {
            console.log('Logout failed:', error)
        }
    }

    const adminSignin = async (formData) => {
        setIsLoading(true)
        setLoginError(null)
        try {
            const response = await axios.post('http://127.0.0.1:3500/api/admin/login', formData)
            console.log(response)
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('name', response.data.name)
                localStorage.setItem('role', response.data.role)
                localStorage.setItem('userId', response.data._id)
                setAuthenticated(true)
            }
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setLoginError(err.response.data.error.wrngEmail)
            } else if (err.response && err.response.status === 400) {
                setLoginError(err.response.data.error.wrngPass)
            } else {
                setLoginError('Login failed. Please try again.')
            }
        } finally {
            setIsLoading(false);
        }
    }

    const adminSignup = async (formData) => {
        setIsLoading(true)
        setSignupError(null)
        setMessage(null)
        try {
            const response = await axios.post('http://127.0.0.1:3500/api/admin/register', formData)
            if (response.status === 200) {
                setMessage('User registered.')
                return response.data
            }
        } catch (err) {
            if (err.response && err.response.status === 409) {
                setSignupError(err.response.data.error.userErr)
            } else {
                setSignupError('Signup failed. Please try again.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const adminLogout = async () => {
        const token = getToken()
        try {
            await axios.patch('http://127.0.0.1:3500/api/admin/logout', {
                headers: { Authorization: `Bearer ${token}` }
            })
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            setAuthenticated(false)
        } catch (error) {
            console.log('Logout failed:', error)
        }
    }

    return (
        <UserContext.Provider value={{ login, signup, logout, adminSignin, adminLogout, adminSignup, authenticated, isLoading, loginError, signupError, message }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider')
    }
    return context
}
