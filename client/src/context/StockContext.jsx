import React, { createContext, useState, useContext } from 'react'
import axios from 'axios'

const StockContext = createContext(undefined)

export const StockProvider = ({ children }) => {
    const [stocks, setStocks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const role = localStorage.getItem('role')
    const token = localStorage.getItem('token')

    const isAdmin = role === 'admin'

    const getAllStocks = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.get('http://127.0.0.1:3500/api/getStocks')
            setStocks(response.data)
        } catch (err) {
            setError('Failed to fetch stocks.')
        } finally {
            setIsLoading(false)
        }
    }

    const createStock = async (stockData) => {
        if (!isAdmin) {
            setError('You are not authorized to perform this action.')
            return
        }
        if (!token) {
            setError('No token found.')
            return
        }

        setIsLoading(true)
        setError(null)
        try {
            await axios.post('http://127.0.0.1:3500/api/admin', stockData, {
                headers: { Authorization: `Bearer ${token}` },
            })
        } catch (err) {
            setError('Failed to create stock.')
        } finally {
            setIsLoading(false)
        }
    }

    const updateStock = async (id, stockData) => {
        if (!isAdmin) {
            setError('You are not authorized to perform this action.')
            return
        }
        if (!token) {
            setError('No token found.')
            return
        }

        setIsLoading(true)
        setError(null)
        try {
            await axios.patch(`http://127.0.0.1:3500/api/admin/${id}`, stockData, {
                headers: { Authorization: `Bearer ${token}` },
            })
        } catch (err) {
            setError('Failed to update stock.')
        } finally {
            setIsLoading(false)
        }
    }

    const deleteStock = async (id) => {
        if (!isAdmin) {
            setError('You are not authorized to perform this action.')
            return
        }
        if (!token) {
            setError('No token found.')
            return
        }

        setIsLoading(true)
        setError(null)
        try {
            await axios.delete(`http://127.0.0.1:3500/api/admin/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
        } catch (err) {
            setError('Failed to delete stock.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <StockContext.Provider value={{ stocks, getAllStocks, createStock, updateStock, deleteStock, isLoading, error }}>
            {children}
        </StockContext.Provider>
    )
}

export const useStockContext = () => {
    const context = useContext(StockContext)
    if (context === undefined) {
        throw new Error('useStockContext must be used within a StockProvider')
    }
    return context
}
