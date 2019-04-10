// // export const getters = {
// //     isAuthenticated(state) {
// //       return state.auth.loggedIn
// //     },
  
// //     loggedInUser(state) {
// //       return state.auth.user
// //     }
// //   }
// export const getters = {
//   authenticated(state) {
//     return state.loggedIn
//   },

//   user(state) {
//     return state.user
//   }
// }

// export const actions = {
//     async nuxtServerInit ({ dispatch, rootState }) {
//         if(rootState.auth.loggedIn)
//         {
//             await dispatch ('notification/setUserMessagesRec',{root:true})
//         }
        
//     },
// }