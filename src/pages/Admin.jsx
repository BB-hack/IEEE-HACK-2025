import React from 'react'
import { useDispatch } from 'react-redux'
import { addEvent } from '../store/eventsSlice'
import AdminPanel from '../components/AdminPanel'

export default function Admin(){
  const dispatch = useDispatch()
  const onCreate = (payload)=> dispatch(addEvent(payload))
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Admin</h2>
      <AdminPanel onCreate={onCreate} />
    </div>
  )
}
