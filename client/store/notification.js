

export const state = () => ({
    notifications: [],
    messagesRec: [],
    messagesSent : [],
    message: {
    	subject : '',
    	message : '',
    	sender : '',
    }
})

//mutators
export const mutations = {
  SET_MSG_REC (state, messages ){
  		state.messagesRec = messages
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
   		
   		// let id = '5c8b2ee76700b710bce659e8'
   		let id = rootState.auth.user._id
   		// console.log(id)
   		let data = await this.$axios.$get(`/getNotification/${id}`)
   		// console.log(data.notification)
   		commit('SET_MSG_REC', data.notification)
   		
   }
}