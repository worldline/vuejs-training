<template>
  <div id="login-form">
    <form @submit.prevent="loggedIn = true" v-if="!loggedIn">
      <h1>{{ title }}</h1>
      <p>Fill this form to login.</p>
      <hr>

      <label for="email"><b>Email</b></label>
      <input v-model="email" type="text" placeholder="Enter your email" id="email" name="email" required>

      <label for="psw"><b>Password</b></label>
      <input v-model="psw" type="password" placeholder="Enter your password" id="psw" name="psw" required>

      <p><button type="submit">Login</button></p>
    </form>
    <search-film v-else></search-film>
  </div>
</template>

<script>
import SearchFilm from './SearchFilm.vue'

export default {
  name: 'LoginForm',
  components: {
    SearchFilm
  },
  data() {
    return {
      title: 'Authentification',
      email: '',
      psw: '',
      loggedIn: false
    }
  }
}
</script>
