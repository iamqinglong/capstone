export const getters = {
  
    authenticated(state) {
      return state.loggedIn
    },
  
    user(state) {
      return state.user
    }
  }

export const state = () => ({
  busy: false,
  loggedIn: false,
  strategy: "local",
  user: false,
  })

export const actions = {
  
  async setUser ({commit }, user) {
    
      commit('SET_USER', user)
  },
  
}

//mutators
export const mutations = {
  SET_USER (state, user , unread){
          state.user = user
          
  },

  

  
}
