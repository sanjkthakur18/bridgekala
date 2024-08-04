import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdAddCircle } from "react-icons/io"
import { BsGraphUp } from "react-icons/bs"
import { VscBellDot } from "react-icons/vsc"
import { RiLoader2Line } from "react-icons/ri"
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md"

const Sidebar = ({ handleForm, setActivePage }) => {

    const navigate = useNavigate()
    const name = localStorage.getItem('name')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            localStorage.clear()
            navigate('/')
        } catch (err) {
            console.error('Logout failed', err)
        }
    }

    return (
        <div className="bg-white text-gray-500 w-64 h-[100vh] p-6 relative">
            <div className="mb-4 flex items-center justify-start gap-2">
                <img src="https://via.placeholder.com/150" alt="Avatar" className="rounded-full w-12 h-12" />
                <h2 className="">{name}</h2>
            </div>
            <div className='flex justify-between items-center mb-4'>
                <div className='flex items-center justify-center gap-4'>
                    <VscBellDot />
                    <RiLoader2Line />
                    <MdOutlineKeyboardDoubleArrowRight />
                </div>
                <button onClick={handleSubmit} className='bg-gray-200 hover:bg-gray-300 p-1 rounded-sm'>Logout</button>
            </div>
            <ul>
                <li onClick={() => setActivePage('stockList')} className="mb-2 flex gap-4 items-center justify-start rounded-sm hover:bg-gray-200 active:bg-gray-200 w-full cursor-pointer p-2">
                    <BsGraphUp /> Manage Stocks
                </li>
            </ul>
            <button onClick={handleForm} className="bg-[#453691] text-white py-2 px-4 rounded w-full flex gap-2 items-center justify-center absolute bottom-6 left-0">
                Add new stock <IoMdAddCircle className='text-lg' />
            </button>
        </div>
    )
}

export default Sidebar
