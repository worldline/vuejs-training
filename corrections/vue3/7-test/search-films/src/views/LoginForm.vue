<template>
<div id="login-form">
  <form @submit.prevent="login">
    <h1>{{ title }}</h1>
    <p>Fill out this form to login.</p>
    <hr />

    <label for="email"><b>Email</b></label>
    <input
      type="text"
      v-model="email"
      placeholder="Enter your email"
      id="email"
      name="email"
      required
    />

    <label for="psw"><b>Password</b></label>
    <input
      type="password"
      v-model="password"
      placeholder="Enter your password"
      id="psw"
      name="psw"
      required
    />

    <p>
      <button type="submit">Login</button>
      <button @click.prevent="register">Create an account</button>
    </p>
    <p class="error" v-if="error">{{ error }}</p>
  </form>
</div>
</template>

<script>
import UserService from "../services/UserService";
import { useSession } from "../stores/session";

export default {
    name: "LoginForm",
    emits: ["login"],
    data(){
        return {
            title: "Authentication",
            email: "",
            password: "",
            error: ""
        }
    },
    methods: {
      async register () {
        this.error = null;
        try {
          const response = await UserService.register({
            email: this.email,
            password: this.password,
            firstname: 'John',
            lastname: 'Smith'
          })
          const session = useSession();
          session.login({ user: response.user, token: response.token });
          this.$router.push('/search')
        } catch (error) {
          this.error = error.toString()
        }
      },

      async login () {
        this.error = null;
        try {
          const response = await UserService.login({ email: this.email, password: this.password })
          const session = useSession();
          session.login({ user: response.user, token: response.token });
          this.$router.push('/search')
        } catch (error) {
          this.error = error.toString()
        }
      }
    }
}
</script>