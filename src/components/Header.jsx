import React from 'react'
import { FaTicketAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Header(){
  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <FaTicketAlt size={28} />
        <h1 className="text-lg font-bold">EventBooking</h1>
      </div>
      <nav className="flex gap-3">
        <Link to="/" className="px-3 py-1 rounded hover:bg-gray-100">Home</Link>
        <Link to="/admin" className="px-3 py-1 rounded hover:bg-gray-100">Admin</Link>
      </nav>
    </header>
  )
}
