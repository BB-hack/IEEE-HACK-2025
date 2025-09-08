import React from 'react'
import EventCard from './EventCard'

export default function EventList({events, onBook}){
  if(!events || !events.length) return <div className="p-6 text-center text-gray-600">No events</div>
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {events.map(e=> <EventCard key={e.id} e={e} onBook={onBook} />)}
    </div>
  )
}
