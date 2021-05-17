<template>
  <div id="app">
    <header v-if="loggedIn" id="logout-btn">
      Logged as <b>{{user}}</b>
      <button @click="logout">Logout</button>
    </header>
    <LoginForm v-if="!loggedIn" @login="loggedIn=true" />
    <SearchFilm v-else />
  </div>
</template>

<script>
import "./stylesheet.css"
import {mapState} from "vuex";
import LoginForm from './components/LoginForm.vue'
import SearchFilm from "@/components/SearchFilm.vue";


export default {
  name: 'App',
  components: {
    SearchFilm,
    LoginForm
  },
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
