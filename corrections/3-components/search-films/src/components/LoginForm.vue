<template>
  <div id="login-form">
    <form @submit.prevent="loggedIn = true" v-if="!loggedIn">
      <h1>{{ title }}</h1>
      <p>Remplissez ce formulaire pour vous connecter.</p>
      <hr>

      <label for="email"><b>Email</b></label>
      <input v-model="email" type="text" placeholder="Entrez votre courriel" id="email" name="email" required>

      <label for="psw"><b>Mot de passe</b></label>
      <input v-model="psw" type="password" placeholder="Entrez votre mot de passe" id="psw" name="psw" required>

      <p><button type="submit">Se connecter</button></p>
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
