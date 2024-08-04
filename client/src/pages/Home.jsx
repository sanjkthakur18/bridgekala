import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
      <div className="w-[50%] h-[50%] rounded-lg flex flex-col gap-4 items-center justify-center bg-white bg-opacity-5 p-6 backdrop-filter shadow-md shadow-slate-50">
        <button className="mb-4">
          <NavLink to="/admin-signin" className="px-4 py-2 rounded shadow-md bg-gray-500 text-white hover:bg-black">
            I am Admin
          </NavLink>
        </button>
        <button>
          <NavLink to="/executive-signin" className="px-4 py-2 rounded shadow-md bg-gray-500 text-white hover:bg-black">
            I am Executive
          </NavLink>
        </button>
      </div>
    </div>
  )
}

export default Home