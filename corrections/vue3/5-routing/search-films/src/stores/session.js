import { defineStore } from "pinia";

export const useSession = defineStore('session', {
  persist: true,
  state: () => {
    return {
      user: null,
      loggedIn: false
    }
  },
  actions: {
    login({ user }) {
      this.loggedIn = true
      this.user = user
    },
    logout(){
      this.loggedIn = false
      this.user = null
    }
  }
})
