import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import StockForm from '../components/StockForm'
import StockList from '../components/StockList'

const AdminDashboard = () => {
    const [showForm, setShowForm] = useState(false)
    const [isRemoving, setIsRemoving] = useState(false)
    const [activePage, setActivePage] = useState('stockList')

    const name = localStorage.getItem('name')

    const toggleForm = () => {
        if (showForm) {
            setIsRemoving(true)
            setTimeout(() => {
                setShowForm(false)
                setIsRemoving(false)
            }, 300)
        } else {
            setShowForm(true)
        }
    }

    return (
        <div className='flex w-full h-screen overflow-hidden'>
            <Sidebar handleForm={toggleForm} setActivePage={setActivePage} />
            <div className='flex-1 bg-gray-100 p-4'>
                <div>
                    <h1 className='text-2xl text-gray-600 font-bold'>Hi, {name}. Welcome to Product Stock Admin Panel.</h1>
                    <hr className='border-[2px] border-gray-600' />
                </div>
                {activePage === 'stockList' && <StockList />}
            </div>
            {showForm || isRemoving ? (
                <div className={`fixed inset-0 ${isRemoving ? 'animate-slideOutFromRight' : 'animate-slideInFromRight'}`}>
                    <StockForm handleForm={toggleForm} showForm={showForm} />
                </div>
            ) : null}
        </div>
    )
}

export default AdminDashboard
