// src/store/reducers/index.js
import { combineReducers } from "redux";
import queueReducer from "./queueReducer";
import adminReducer from "./adminReducer";

const rootReducer = combineReducers({
  queue: queueReducer,
  admin: adminReducer,
});

export default rootReducer;
