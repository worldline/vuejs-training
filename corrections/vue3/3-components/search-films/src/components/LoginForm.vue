<template>
<div id="login-form">
<form v-on:submit.prevent="onLogin">
  <h1>Authentification</h1>
  <p>Remplissez ce formulaire pour vous connecter.</p>
  <hr>

  <label for="email"><b>Email</b></label>
  <input type="text" placeholder="Entrez votre courriel" id="email" name="email" required v-model="email">

  <label for="psw"><b>Mot de passe</b></label>
  <input type="password" placeholder="Entrez votre mot de passe" id="psw" name="psw" required v-model="password">

  <p><button type="submit">Se connecter</button></p>
</form>
</div>
</template>

<script>
export default {
    name: "LoginForm",
    emits: ['login'],
    data(){
        return {
            title: "Authentification",
            email: "",
            password: "",
        }
    },
    methods: {
      onLogin(){
        this.$emit('login')
      }
    }
}
</script>