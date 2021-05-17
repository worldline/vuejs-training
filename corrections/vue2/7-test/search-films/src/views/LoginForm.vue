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

      <p>
        <button @click.stop="register">Register</button>
        <button type="submit">Login</button>
      </p>
      <p class="error" v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import UserService from "@/services/UserService";

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

<style scoped>
.error {
  color: red;
}
</style>