<template>
  <div id="login-form">
    <form @submit.prevent="login">
      <h1>{{ title }}</h1>
      <p>Fill this form to login.</p>
      <hr>

      <label for="email"><b>Email</b></label>
      <input type="text" placeholder="Enter your email" id="email" name="email" required v-model="email">

      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter your password" id="psw" name="psw" required v-model="password">

      <p><button type="submit">Login</button></p>
      <p class="error" v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  emits: ["login"],
  data() {
    return {
      title: "Authentication",
      email: "",
      password: "",
      error: null
    }
  },
  methods: {
    login(){
      if(this.email === "test@test.com" && this.password === "test1234"){
        this.$store.dispatch("login", { user: "John Smith" });
        this.$emit('login')
      } else {
        this.error = "Invalid credentials"
      }
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>