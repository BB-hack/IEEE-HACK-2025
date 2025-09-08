import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { bookEvent } from '../api'

export const createBooking = createAsyncThunk('bookings/add', async (payload)=> await bookEvent(payload))

const slice = createSlice({
  name:'bookings',
  initialState:{ list:[] },
  reducers:{},
  extraReducers:(b)=>{
    b.addCase(createBooking.fulfilled,(s,a)=>{ s.list.push(a.payload) })
  }
})
export default slice.reducer
