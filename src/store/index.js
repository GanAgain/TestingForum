import { createStore } from 'vuex'
import articlesModule from './articles/index.js'
import quizModule from './quiz/index.js'
import usersModule from './users/index.js'
import authModule from './auth/index.js'

export default createStore({
  modules: {
    articles: articlesModule,
    quiz: quizModule,
    users: usersModule,
    auth: authModule
  },
  state(){
    return{
      darkMode: false
    }
  },
  mutations: {
    setDarkMode(state){
      state.darkMode = !state.darkMode
      localStorage.setItem('darkmode', state.darkMode)
    }
  },
  actions: {
    changeDarkMode(context){
      context.commit('setDarkMode')  
    },
    tryDarkMode(context){
      const mode = localStorage.getItem('darkmode')
      if(mode === 'true'){
        context.commit('setDarkMode')
      }
    }
  },
  getters: {
    getDarkMode(state){
      return state.darkMode
    }
  }
})
