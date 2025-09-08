// import { configureStore } from '@reduxjs/toolkit'
// import eventsReducer from './eventsSlice'
// import bookingsReducer from './bookingsSlice'

// import { configureStore } from "@reduxjs/toolkit";
//  // point to your actual slice files (example uses src/store/)
// import eventsReducer from "./store/eventsSlice"; // or ./store/eventsSlice.js if you created it
// import bookingsReducer from "./store/bookingsSlice"; // or ./store/bookingsSlice.js if you created it
// // import authReducer from "./store/authSlice";       // or ./store/authSlice.js if you created it
// // import ticketsReducer from "./store/ticketsSlice"; // or remove these if not used
// export const store = configureStore({
//   reducer: { events: eventsReducer, bookings: bookingsReducer }
// })


import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./eventsSlice";   // correct path (inside same folder)
import bookingsReducer from "./bookingsSlice";

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    bookings: bookingsReducer
  }
});



