<template>
  <div v-if="loggedIn" id="session-info">
    Connecté en tant que <b>{{user.firstname}} {{user.lastname}}</b>
    <button @click="logout">Déconnexion</button>
  </div>
  <router-view />
</template>

<script>
import { mapState } from "pinia"
import { useSession } from "./stores/session";

export default {
  name: "App",
  computed: {
    ...mapState(useSession, ["loggedIn", "user"])
  },
  methods: {
    logout() {
      const session = useSession()
      session.logout()
      this.$router.push('/login')
    }
  }
}
</script>

<style>
@import './assets/base.css';
</style>
