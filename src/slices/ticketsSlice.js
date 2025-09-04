import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],  // { id, title, description, createdBy, bookedBy }
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    createTicket: {
      reducer: (state, action) => {
        state.tickets.push(action.payload);
      },
      prepare: ({ title, description, createdBy }) => ({
        payload: {
          id: nanoid(),
          title,
          description,
          createdBy,
          bookedBy: null,
        },
      }),
    },
    bookTicket: (state, action) => {
      const ticket = state.tickets.find((t) => t.id === action.payload.id);
      if (ticket && !ticket.bookedBy) {
        ticket.bookedBy = action.payload.user;
      }
    },
    cancelBooking: (state, action) => {
      const ticket = state.tickets.find((t) => t.id === action.payload.id);
      if (ticket) {
        ticket.bookedBy = null;
      }
    },
    deleteTicket: (state, action) => {
      state.tickets = state.tickets.filter((t) => t.id !== action.payload);
    },
  },
});

export const { createTicket, bookTicket, cancelBooking, deleteTicket } =
  ticketsSlice.actions;
export default ticketsSlice.reducer;
