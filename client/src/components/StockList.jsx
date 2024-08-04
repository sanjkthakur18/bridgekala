import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import { FaDownload } from "react-icons/fa"
import { MdOutlineDeleteForever } from "react-icons/md"
import { GoPencil } from "react-icons/go"
import Popup from '../components/Popup'
import { useStockContext } from '../context/StockContext'

const StockList = () => {
  const { stocks, getAllStocks, deleteStock } = useStockContext()
  const [popup, setPopup] = useState(false)
  const [currentStock, setCurrentStock] = useState(null)

  useEffect(() => {
    getAllStocks()
  }, [getAllStocks])

  const togglePopup = () => {
    setPopup(!popup)
  }

  const handleEdit = (task) => {
    setCurrentStock(task)
    setPopup(true)
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

  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow mt-6">
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold text-gray-400'>Click on download button to download in EXCEL file.</h1>
          <button onClick={exportToExcel} className='bg-green-500 hover:bg-green-700 p-1 rounded-sm flex gap-2 items-center justify-between text-white'>Download Excel <FaDownload /></button>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Product Name</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Quantity</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock._id} className="border-b">
                <td className="p-2">{stock.productName}</td>
                <td className="p-2">{stock.type}</td>
                <td className="p-2">{new Date(stock.date).toLocaleDateString()}</td>
                <td className="p-2">{stock.quantity}</td>
                <td className="p-2 flex gap-2">
                  <GoPencil onClick={() => { handleEdit(stock); togglePopup() }} className='text-green-500 cursor-pointer' />
                  <MdOutlineDeleteForever onClick={() => deleteStock(stock._id)} className='text-rose-600 cursor-pointer' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {popup && <Popup handlePopup={togglePopup} showForm={popup} stock={currentStock} />}
    </>
  )
}

export default StockList
