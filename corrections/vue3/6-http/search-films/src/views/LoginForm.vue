<template>
<div id="login-form">
<form v-on:submit.prevent="login">
  <h1>Authentification</h1>
  <p>Remplissez ce formulaire pour vous connecter.</p>
  <hr>

  <label for="email"><b>Email</b></label>
  <input type="text" placeholder="Entrez votre courriel" id="email" name="email" required v-model="email">

  <label for="psw"><b>Mot de passe</b></label>
  <input type="password" placeholder="Entrez votre mot de passe" id="psw" name="psw" required v-model="password">

  <p>
    <button @click.stop="register">S'inscrire</button>
    <button type="submit">Se connecter</button>
  </p>
  <p class="error" v-if="error">{{error}}</p>
</form>
</div>
</template>

<script>
import UserService from "@/services/UserService"

export default {
  name: "LoginForm",
  emits: ['login'],
  data(){
      return {
          title: "Authentification",
          email: "",
          password: "",
          error: null
      }
  },
  methods: {
    async register() {
      try {
        const response = await UserService.register({
          email: this.email,
          password: this.password,
          firstname: "John",
          lastname: "Smith"
        });
        this.$store.dispatch("login", {
          user: response.user,
          token: response.token
        });
        this.$router.push("/search");
      } catch (error) {
        this.error = error.toString();
      }
    },
    async login() {
      try {
        const response = await UserService.login({
          email: this.email,
          password: this.password
        });
        this.$store.dispatch("login", {
          user: response.user,
          token: response.token
        });
        this.$router.push("/search");
      } catch (error) {
        this.error = error.toString();
      }
    }
  }
}
</script>