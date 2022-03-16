<template>
  <LoginForm v-if="!loggedIn" @login="onLogin" />
  <SearchFilm v-else />
</template>

<script>
import LoginForm from "./components/LoginForm.vue";
import SearchFilm from "./components/SearchFilm.vue";

export default {
  name: "App",
  components: { LoginForm, SearchFilm },
  data(){
    return {
      loggedIn: false
    }
  },
  methods: {
    onLogin(){
      this.loggedIn = true
    }
  }
}
</script>

<style>
@import './assets/base.css';
</style>
