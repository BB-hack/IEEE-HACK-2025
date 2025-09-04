// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";
// import ticketsReducer from "./slices/ticketsSlice";

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     tickets: ticketsReducer,
//   },
// });

// export default store;



import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import ticketsReducer from "./slices/ticketsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketsReducer,
  },
});

export default store;

