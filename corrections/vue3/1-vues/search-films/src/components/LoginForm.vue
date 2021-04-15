<template>
<div id="login-form">
<form>
  <h1>Authentification</h1>
  <p>Remplissez ce formulaire pour vous connecter.</p>
  <hr>

  <label for="email"><b>Email</b></label>
  <input type="text" placeholder="Entrez votre courriel" id="email" name="email" required>

  <label for="psw"><b>Mot de passe</b></label>
  <input type="password" placeholder="Entrez votre mot de passe" id="psw" name="psw" required>

  <p><button type="submit">Se connecter</button></p>
</form>
</div>
</template>

<script>
export default {
    name: "LoginForm",
    data(){
        return {
            title: "Authentification"
        }
    }
}
</script>