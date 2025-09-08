import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchEvents, createEvent } from '../api'

export const loadEvents = createAsyncThunk('events/load', async ()=> await fetchEvents())
export const addEvent = createAsyncThunk('events/add', async (payload)=> await createEvent(payload))

const slice = createSlice({
  name:'events',
  initialState:{ list:[], status:'idle' },
  reducers:{ setEvents:(s,a)=>{ s.list=a.payload } },
  extraReducers:(b)=>{
    b.addCase(loadEvents.pending,(s)=>{ s.status='loading' })
    b.addCase(loadEvents.fulfilled,(s,a)=>{ s.list=a.payload; s.status='succeeded' })
    b.addCase(loadEvents.rejected,(s)=>{ s.status='failed' })
    b.addCase(addEvent.fulfilled,(s,a)=>{ s.list.push(a.payload) })
  }
})
export const { setEvents } = slice.actions
export default slice.reducer
