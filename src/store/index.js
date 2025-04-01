import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: {}
  },
  mutations: {
    setUserInfo: (state, userInfo) => {
        state.userInfo = userInfo
    },
    clearUserInfo: (state) => {
        console.log('clearUserInfo')
        state.userInfo = {}
    },
  },
  actions: {
  },
  modules: {
  }
})

