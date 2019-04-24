

export const state = () => ({
    notifications: [],
    messagesRec: [],
    unread: 0,
    messagesSent : [],
    message: {
        _id: '',
    	subject : '',
        message : '',
        created_at : '',
        updated_at : '',
    }
})

//mutators
export const mutations = {
  SET_MSG_REC (state, messages , unread){
          state.messagesRec = messages
          
  },

  SET_UNREAD (state,unread) {
    state.unread = unread
  },

  SET_MSG_VIEW (state, message ) {
    state.message = message
  },

  CLEAR_MESSAGE (state) {
    state.message = {
        _id: '',
    	subject : '',
        message : '',
        created_at : '',
        updated_at : '',
    }
  },

  NEW_MSG_NOTIFICATION (state, message){
    state.messagesRec.unshift(message)
  }
  

  
}

//getters
export const getters =  {
    msgRec(state) {
        return state.messagesRec
    }
}



//actions
export const actions = {
    
     async setUserMessagesRec ({commit, rootState }) {
   		
   		
      if(rootState.auth.loggedIn){
        let id = rootState.auth.user._id
        let data = await this.$axios.$get(`/api/getUserNotification/${id}`)
   		
           commit('SET_MSG_REC', data.notification)
           commit('SET_UNREAD', data.unread)
      }
   		
   },
   
   async getNotificationById ({commit}, id) {
       
        let data = await this.$axios.$get(`/api/getNotification/${id}`)
        // console.log(data.notification)
   		commit('SET_MSG_VIEW', data.notification)
   },

   async clearMessage ({commit}) {
       commit('CLEAR_MESSAGE')
   },

   async newMessageNotification ({commit}, message)
   {
     commit('NEW_MSG_NOTIFICATION', message)
   },
}