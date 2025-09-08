import React, { useEffect, useState, useRef } from 'react'

export default function ChatBox({socketEmit, onEvent}){
  const [text,setText] = useState('')
  const [msgs, setMsgs] = useState([])
  const listRef = useRef()
  useEffect(()=>{
    const handler = (type,payload)=>{ if(type==='chat') setMsgs(m=>[...m,payload]) }
    if(onEvent) onEvent.current = handler
  },[onEvent])
  useEffect(()=> listRef.current?.scrollIntoView({behavior:'smooth'}),[msgs])
  const send = ()=>{
    if(!text) return
    const m = { id: Date.now(), text, from: 'You', time: new Date().toISOString() }
    setMsgs(mg=>[...mg,m])
    socketEmit('chat:message', m)
    setText('')
  }
  return (
    <div className="w-full max-w-md bg-white shadow rounded p-3 flex flex-col">
      <div className="flex-1 overflow-auto mb-2 space-y-2 h-48">
        {msgs.map(m=> (<div key={m.id} className="text-sm"><strong>{m.from}:</strong> {m.text}</div>))}
        <div ref={listRef} />
      </div>
      <div className="flex gap-2">
        <input value={text} onChange={e=>setText(e.target.value)} className="border p-2 rounded flex-1" />
        <button onClick={send} className="bg-blue-600 text-white px-3 py-1 rounded">Send</button>
      </div>
    </div>
  )
}
