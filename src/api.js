import axios from 'axios'
const BASE = import.meta.env.DEV ? 'http://localhost:4000' : ''
export const api = axios.create({ baseURL: BASE })
export const fetchEvents = ()=> api.get('/api/events').then(r=>r.data)
export const createEvent = payload=> api.post('/api/events', payload).then(r=>r.data)
export const bookEvent = payload=> api.post('/api/book', payload).then(r=>r.data)
