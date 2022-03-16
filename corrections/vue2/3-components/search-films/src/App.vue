<template>
  <div id="app">
    <LoginForm v-if="loggedIn === false" @login="loggedIn = true" />
    <SearchFilm v-else />
  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue';
import SearchFilm from './components/SearchFilm.vue';

export default {
  data(){
    return {
      loggedIn: false
    }
  },
  components: { LoginForm, SearchFilm }
}
</script>

<style>
@import './assets/base.css';
</style>
