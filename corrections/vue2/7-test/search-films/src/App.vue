<template>
  <div id="app">
    <header v-if="loggedIn" id="logout-btn">
      Logged as <b>{{user.firstname}} {{user.lastname}}</b>
      <button @click="logout">Logout</button>
    </header>
    <router-view />
  </div>
</template>

<script>
import "./stylesheet.css"
import {mapState} from "vuex";

export default {
  name: 'App',
  computed:{
    ...mapState(["loggedIn", "user"])
  },
  methods: {
    logout(){
      this.$store.dispatch("logout")
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
