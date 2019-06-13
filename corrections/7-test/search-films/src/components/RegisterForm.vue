<template>
  <div class="form">
    <form @submit.prevent="register">
      <div class="alert" v-if="error">
        <span class="closebtn" @click="error = null">&times;</span>
        {{ error }}
      </div>
      <h1>{{ title }}</h1>
      <p>Remplissez ce formulaire pour vous enregister.</p>
      <hr>
      <span></span>

      <label for="email"><b>Email</b></label>
      <input v-model="email" type="text" placeholder="Entrez votre courriel" id="email" name="email" required>

      <label for="password"><b>Mot de passe</b></label>
      <input v-model="password" type="password" placeholder="Entrez votre mot de passe" id="password" name="password" required>

      <p><button type="submit">S'enregister</button></p>
    </form>
  </div>
</template>

<script>
import UserService from '@/services/UserService.js'

export default {
  name: 'RegisterForm',
  data() {
    return {
      title: 'S\'enregister',
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await UserService.register({
          email: this.email,
          password: this.password,
          firstname: 'John',
          lastname: 'Smith'
        })
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

