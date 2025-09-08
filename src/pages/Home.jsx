import React from 'react'
import { useSelector } from 'react-redux'
import EventList from '../components/EventList'

export default function Home({onBook}){
  const events = useSelector(s=>s.events.list)
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Upcoming Events</h2>
      <EventList events={events} onBook={onBook} />
    </div>
  )
}
