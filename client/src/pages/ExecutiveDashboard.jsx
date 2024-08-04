import React, { useEffect } from 'react'
import * as XLSX from 'xlsx'
import { useNavigate } from 'react-router-dom'
import { FaDownload } from "react-icons/fa"
import { useStockContext } from '../context/StockContext'
import { useUserContext } from '../context/AuthContext'

const ExecutiveDashboard = () => {
  const { stocks, getAllStocks } = useStockContext()
  const { logout } = useUserContext()

  const navigate = useNavigate()

  const name = localStorage.getItem('name')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await logout()
      localStorage.clear()
      navigate('/')
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(stocks, {
      header: ["productName", "type", "date", "quantity"],
      dateNF: "YYYY-MM-DD",
    })

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Stock Data")

    XLSX.writeFile(wb, "stock_data.xlsx")
  }

  useEffect(() => {
    getAllStocks()
  }, [getAllStocks])

  return (
    <>
      <div className="p-4 bg-gray-100 rounded-lg shadow mt-6">
        <div className='flex items-center justify-between my-4'>
          <h1 className='text-2xl text-gray-600 font-bold'>Hi, {name}. Welcome to Product Stock page.</h1>
          <div className='flex space-x-4'>
            <button onClick={handleSubmit} className='bg-gray-500 hover:bg-gray-700 p-1 rounded-sm'>Logout</button>
            <button onClick={exportToExcel} className='bg-green-500 hover:bg-green-700 p-1 rounded-sm flex gap-2 items-center justify-between text-white'>Download Excel <FaDownload /></button>
          </div>
        </div>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-400 border-b border-gray-200">
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Product Name</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Type</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock._id} className='hover:bg-gray-100' >
                <td className="p-4 text-sm text-gray-700">{stock.productName}</td>
                <td className="p-4 text-sm text-gray-700">{stock.type}</td>
                <td className="p-4 text-sm text-gray-700">{new Date(stock.date).toLocaleDateString()}</td>
                <td className="p-4 text-sm text-gray-700">{stock.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ExecutiveDashboard