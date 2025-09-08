import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
export default function useSocket(onEvent){
  const socketRef = useRef()
  useEffect(()=>{
    socketRef.current = io('http://localhost:4000')
    const s = socketRef.current
    s.on('events:update', data=> onEvent && onEvent('events', data))
    s.on('booking:created', data=> onEvent && onEvent('booking', data))
    s.on('chat:message', data=> onEvent && onEvent('chat', data))
    return ()=> s.disconnect()
  },[])
  const emit = (name,payload)=> socketRef.current?.emit(name,payload)
  return { emit }
}
