export const state = () => ({
    errors: {}
})

//getters
export const getters =  {
    errors(state) {
        return state.errors
    }
}

//mutators
export const mutations = {
    SET_VALIDATION_ERRORS(state, errors) {
          state.errors  = errors
    },

    SET_404_ERRORS(state, errors) {
          state.errors  = errors
    }
}

//actions
export const actions = {
    setErrors({commit}, errors) {
        commit("SET_VALIDATION_ERRORS", errors)
    },
    set404Errors({commit}, errors) {
        commit("SET_404_ERRORS", errors)
    },
    clearErrors({commit}) {
        commit("SET_VALIDATION_ERRORS", {})
    }
}