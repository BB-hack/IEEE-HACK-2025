// // src/reducers/queueReducer.js
// const initialQueueState = {
//   users: [],
//   currentPosition: 0,
//   totalUsers: 0,
//   isActive: false,
//   notifications: []
// };

// const queueReducer = (state = initialQueueState, action) => {
//   switch (action.type) {
//     case 'JOIN_QUEUE':
//       const newUser = {
//         id: action.payload.userId,
//         position: state.users.length + 1,
//         timestamp: Date.now(),
//         status: 'waiting'
//       };
//       return {
//         ...state,
//         users: [...state.users, newUser],
//         currentPosition: newUser.position,
//         isActive: true,
//         totalUsers: state.users.length + 1
//       };
//     case 'UPDATE_POSITION':
//       return {
//         ...state,
//         currentPosition: Math.max(1, state.currentPosition - action.payload.processed)
//       };
//     case 'PROCESS_USERS':
//       const remainingUsers = state.users.filter((_, index) => index >= action.payload.count);
//       return {
//         ...state,
//         users: remainingUsers,
//         totalUsers: remainingUsers.length
//       };
//     case 'ADD_NOTIFICATION':
//       return {
//         ...state,
//         notifications: [...state.notifications, action.payload]
//       };
//     case 'CLEAR_NOTIFICATIONS':
//       return {
//         ...state,
//         notifications: []
//       };
//     default:
//       return state;
//   }
// };

// export default queueReducer;


// src/store/reducers/queueReducer.js
const initialQueueState = {
  users: [],
  currentPosition: 0,
  isActive: false,
  totalUsers: 0,
  notifications: [],
};

const queueReducer = (state = initialQueueState, action) => {
  switch (action.type) {
    case "JOIN_QUEUE":
      const newUser = {
        id: action.payload.userId,
        position: state.users.length + 1,
        timestamp: Date.now(),
        status: "waiting",
      };
      return {
        ...state,
        users: [...state.users, newUser],
        currentPosition: newUser.position,
        isActive: true,
        totalUsers: state.users.length + 1,
      };
    default:
      return state;
  }
};

export default queueReducer;
