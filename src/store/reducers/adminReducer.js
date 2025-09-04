// // src/reducers/adminReducer.js
// const initialAdminState = {
//   queues: [],
//   metrics: {}
// };

// const adminReducer = (state = initialAdminState, action) => {
//   switch (action.type) {
//     case 'UPDATE_QUEUE_STATUS':
//       return {
//         ...state,
//         queues: state.queues.map(queue =>
//           queue.id === action.payload.id
//             ? { ...queue, active: action.payload.active }
//             : queue
//         )
//       };
//     case 'UPDATE_METRICS':
//       return {
//         ...state,
//         metrics: { ...state.metrics, ...action.payload }
//       };
//     default:
//       return state;
//   }
// };

// export default adminReducer;


// src/store/reducers/adminReducer.js
const initialAdminState = {
  queues: [],
  metrics: {},
};

const adminReducer = (state = initialAdminState, action) => {
  switch (action.type) {
    case "UPDATE_QUEUE_STATUS":
      return {
        ...state,
        queues: state.queues.map((queue) =>
          queue.id === action.payload.id
            ? { ...queue, active: action.payload.active }
            : queue
        ),
      };
    default:
      return state;
  }
};

export default adminReducer;

