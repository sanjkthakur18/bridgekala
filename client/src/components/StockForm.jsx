import React, { useState } from 'react'
import { IoIosClose } from "react-icons/io"
import { RiLoader2Line } from "react-icons/ri"
import { CiCalendarDate } from "react-icons/ci"
import { MdOutlineProductionQuantityLimits } from "react-icons/md"
import { toast } from 'react-toastify'
import { useStockContext } from '../context/StockContext'
import 'react-toastify/dist/ReactToastify.css'

const StockForm = ({ handleForm, showForm }) => {
    const [stockData, setStockData] = useState({ productName: '', type: '', date: '', quantity: 0 })
    const { createStock } = useStockContext()

    const handleChange = (evt) => {
        setStockData({ ...stockData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await createStock(stockData)
            setStockData({ productName: '', type: '', date: '', quantity: 0 })
            toast.success('Stock created successfully!')
        } catch (error) {
            toast.error('Failed to create stock.')
        }
    }

    return (
        <div className='flex absolute bg-black bg-opacity-20 w-[100vw] h-[100vh]'>
            <div className='w-[50%]' onClick={handleForm}></div>
            <div className={`h-full w-1/2 bg-white p-4 transition-transform duration-300 ease-in-out ${showForm ? 'animate-slideInFromRight' : 'animate-slideOutFromRight'}`}>
                <div className='flex items-center justify-between'>
                    <h1 className='text-2xl text-gray-600 font-extrabold'>Add New Stock</h1>
                    <IoIosClose onClick={handleForm} className='text-2xl text-red-600 font-bold cursor-pointer' />
                </div>
                <hr className='border-gray-700 border-[2px]' />
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className='my-6'>
                            <input type="text" name='productName' value={stockData.productName} onChange={handleChange} placeholder='Product Name' className='outline-none placeholder:text-[1.5rem] border-none w-full' />
                        </div>
                        <div className='text-gray-500 flex gap-6 items-center my-2'>
                            <div className='flex items-center gap-2 w-[6rem]'>
                                <RiLoader2Line />
                                <p>Type</p>
                            </div>
                            <select name='type' value={stockData.type} onChange={handleChange} className='custom-select p-2 outline-none border-none w-[20%]' >
                                <option value="" disabled hidden>Not Selected</option>
                                <option value="incoming">Incoming</option>
                                <option value="outgoing">Outgoing</option>
                            </select>
                        </div>
                        <div className='text-gray-500 flex gap-6 items-center my-2'>
                            <div className='flex items-center gap-2 w-[6rem]'>
                                <CiCalendarDate />
                                <p>Date</p>
                            </div>
                            <input name='date' type="date" value={stockData.date} onChange={handleChange} className='outline-none border-none' />
                        </div>
                        <div className='text-gray-500 flex gap-6 items-center my-2'>
                            <div className='flex items-center gap-2 w-[6rem]'>
                                <MdOutlineProductionQuantityLimits />
                                <p>Quantity</p>
                            </div>
                            <input type="number" name='quantity' value={stockData.quantity} onChange={handleChange} className='outline-none border-none' placeholder='Quantity' />
                        </div>
                        <button className='bg-[#453691] text-white py-2 px-4 rounded mt-4 w-[50%] hover:bg-[#877CCA]'>
                            Add Stock
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default StockForm
