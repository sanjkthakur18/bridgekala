import React, { useState } from 'react'
import { IoIosClose } from "react-icons/io"
import { RiLoader2Line } from "react-icons/ri"
import { CiCalendarDate } from "react-icons/ci"
import { MdOutlineProductionQuantityLimits } from "react-icons/md"
import { toast } from 'react-toastify'
import { useStockContext } from '../context/StockContext'
import 'react-toastify/dist/ReactToastify.css'

const Popup = ({ handlePopup, showForm, stock }) => {
    const [stockData, setStockData] = useState({ _id: stock?._id || '', productName: stock?.productName || '', type: stock?.type || '', date: stock?.date || '', quantity: stock?.quantity || '' })
    const { updateStock } = useStockContext()

    const handleChange = (evt) => {
        setStockData({ ...stockData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (stockData._id) {
                const updatedStock = {
                    ...stockData,
                    date: new Date(stockData.date)
                }
                await updateStock(stockData._id, updatedStock)
                toast.success('Stock updated successfully!')
                handlePopup()
            }
        } catch (error) {
            toast.error('Failed to update stock.')
        }
    }

    if (!showForm) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center text-black">Update Stock</h2>
                <button onClick={handlePopup} className="absolute top-2 right-2 z-10">
                    <IoIosClose className="text-red-500 font-bold hover:text-red-700 text-[2rem]" />
                </button>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className='my-6'>
                        <input type="text" name="productName" value={stockData.productName} onChange={handleChange} placeholder="Product Name" required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#453691]" />
                    </div>
                    <div className="text-gray-500 flex gap-6 items-center my-2">
                        <div className='flex items-center gap-2 w-[6rem]'>
                            <RiLoader2Line />
                            <p>Type</p>
                        </div>
                        <select className="custom-select p-2 outline-none border-none w-[50%]" value={stockData.type} name="type" onChange={handleChange} required >
                            <option value="" disabled hidden>Not Selected</option>
                            <option value="incoming">Incoming</option>
                            <option value="outgoing">Outgoing</option>
                        </select>
                    </div>
                    <div className="text-gray-500 flex gap-6 items-center my-2">
                        <div className='flex items-center gap-2 w-[6rem]'>
                            <CiCalendarDate />
                            <p>Date</p>
                        </div>
                        <input type="date" name="date" value={stockData.date} onChange={handleChange} required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#453691]" />
                    </div>
                    <div className="text-gray-500 flex gap-6 items-center my-2">
                        <div className='flex items-center gap-2 w-[6rem]'>
                            <MdOutlineProductionQuantityLimits />
                            <p>Quantity</p>
                        </div>
                        <input type="number" name="quantity" value={stockData.quantity} onChange={handleChange} required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#453691]" />
                    </div>
                    <button type="submit" className="w-full py-2 px-4 text-white bg-[#453691] rounded hover:bg-[#877CCA]" >
                        Update Stock
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Popup
