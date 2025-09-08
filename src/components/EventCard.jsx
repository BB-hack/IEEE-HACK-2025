import React from 'react'
import { Link } from 'react-router-dom'

export default function EventCard({e, onBook}){
  const remaining = e.totalSeats - (e.booked||0)
  return (
    <div className="bg-white shadow rounded overflow-hidden flex flex-col">
      <img src={e.image || '/images/default-event-1.jpg'} alt={e.title} className="h-40 w-full object-cover" />
      <div className="p-4 flex-1 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{e.title}</h3>
          <div className="text-sm">₹{e.price}</div>
        </div>
        <div className="text-sm text-gray-500">{e.venue}</div>
        <div className="text-sm text-gray-500">{new Date(e.startTime).toLocaleString()}</div>
        <div className="flex items-center justify-between mt-auto">
          <div className="text-sm text-gray-600">Seats left: {remaining}</div>
          <div className="flex gap-2">
            <button disabled={remaining<=0} onClick={()=>onBook(e)} className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50">Book</button>
            <Link to={`/events/${e.id}`} className="px-3 py-1 border rounded">View</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
