<template>
  <header v-if="loggedIn" id="logout-btn">
    Connecté en tant que <b>{{user}}</b>
    <button @click="logout">Déconnexion</button>
  </header>
  <router-view />
</template>

<script>
import "./stylesheet.css"
import { mapState } from "vuex"

export default {
  name: 'App',
  computed: mapState(['loggedIn', 'user']),
  methods: {
    logout(){
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
