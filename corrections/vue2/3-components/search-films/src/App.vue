<template>
  <div id="app">
    <LoginForm v-if="!loggedIn" @login="loggedIn=true" />
    <SearchFilm v-else />
  </div>
</template>

<script>
import "./stylesheet.css"
import LoginForm from './components/LoginForm.vue'
import SearchFilm from "@/components/SearchFilm.vue";

export default {
  name: 'App',
  components: {
    SearchFilm,
    LoginForm
  },
  data(){
    return {
      loggedIn: false
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
