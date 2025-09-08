import React, { useState } from 'react'

export default function BookingModal({event, onClose, onBook}){
  const [name,setName] = useState('')
  const [seats,setSeats] = useState(1)
  if(!event) return null
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded max-w-md w-full p-4">
        <h3 className="font-bold">Book: {event.title}</h3>
        <div className="mt-2">
          <label className="block text-sm">Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="border w-full p-2 rounded mt-1" />
        </div>
        <div className="mt-2">
          <label className="block text-sm">Seats</label>
          <input type="number" value={seats} min={1} max={event.totalSeats - (event.booked||0)} onChange={e=>setSeats(Number(e.target.value))} className="border w-full p-2 rounded mt-1" />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1">Cancel</button>
          <button onClick={()=> onBook({ eventId: event.id, name, seats })} className="px-3 py-1 bg-blue-600 text-white rounded">Confirm</button>
        </div>
      </div>
    </div>
  )
}
