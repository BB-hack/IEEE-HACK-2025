import React, { useState } from 'react'

export default function AdminPanel({onCreate}){
  const [form, setForm] = useState({ title:'', venue:'', startTime:'', endTime:'', totalSeats:50, bucketCount:5, price:0, image:'/images/default-event-1.jpg' })
  const submit = ()=>{
    onCreate(form)
    setForm({ title:'', venue:'', startTime:'', endTime:'', totalSeats:50, bucketCount:5, price:0, image:'/images/default-event-1.jpg' })
  }
  return (
    <div className="p-4 max-w-xl">
      <h2 className="font-bold mb-3">Create Event</h2>
      <div className="grid grid-cols-1 gap-2">
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="p-2 border rounded" />
        <input placeholder="Venue" value={form.venue} onChange={e=>setForm({...form,venue:e.target.value})} className="p-2 border rounded" />
        <input type="datetime-local" value={form.startTime} onChange={e=>setForm({...form,startTime:e.target.value})} className="p-2 border rounded" />
        <input type="datetime-local" value={form.endTime} onChange={e=>setForm({...form,endTime:e.target.value})} className="p-2 border rounded" />
        <input type="number" value={form.totalSeats} onChange={e=>setForm({...form,totalSeats:Number(e.target.value)})} className="p-2 border rounded" />
        <input type="number" value={form.bucketCount} onChange={e=>setForm({...form,bucketCount:Number(e.target.value)})} className="p-2 border rounded" />
        <input type="number" value={form.price} onChange={e=>setForm({...form,price:Number(e.target.value)})} className="p-2 border rounded" />
        <input placeholder="Image URL" value={form.image} onChange={e=>setForm({...form,image:e.target.value})} className="p-2 border rounded" />
        <div className="flex gap-2">
          <button onClick={submit} className="px-3 py-1 bg-green-600 text-white rounded">Create</button>
        </div>
      </div>
    </div>
  )
}
