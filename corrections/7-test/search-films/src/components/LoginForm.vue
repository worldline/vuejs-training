<template>
  <div class="form">
    <form @submit.prevent="logIn">
      <div class="alert" v-if="error">
        <span class="closebtn" @click="error = null">&times;</span>
        {{ error }}
      </div>
      <h1>{{ title }}</h1>
      <p>Remplissez ce formulaire pour vous connecter.</p>
      <hr>
      <span></span>

      <label for="email"><b>Email</b></label>
      <input v-model="email" type="text" placeholder="Entrez votre courriel" id="email" name="email" required>

      <label for="password"><b>Mot de passe</b></label>
      <input v-model="password" type="password" placeholder="Entrez votre mot de passe" id="password" name="password" required>

      <p><button type="submit">Se connecter</button></p>
    </form>

  </div>
</template>

<script>
import UserService from '@/services/UserService.js'

export default {
  name: 'LoginForm',
  data() {
    return {
      title: 'Authentification',
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async logIn () {
      try {
        const response = await UserService.login({ email: this.email, password: this.password })
        this.$store.dispatch('setUser', response.user)
        this.$store.dispatch('setToken', response.token)
        this.$router.push('/search')
      } catch (error) {
        this.error = error.toString()
      }
    }
  }
}
</script>


