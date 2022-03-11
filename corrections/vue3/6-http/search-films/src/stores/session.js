import { defineStore } from "pinia";

export const useSession = defineStore('session', {
  persist: true,
  state: () => {
    return {
      user: null,
      token: null,
      loggedIn: false      
    }
  },
  actions: {
    login({ user, token }) {
      this.loggedIn = true
      this.user = user
      this.token = token
    },
    logout(){
      this.loggedIn = false
      this.user = null
      this.token = null
    }
  }
})
