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

    <p><button type="submit">Login</button></p>
  </form>
</div>
</template>

<script>
export default {
    name: "LoginForm",
    emits: ["login"],
    data(){
        return {
            title: "Authentication",
            email: "",
            password: ""
        }
    },
    methods: {
        login(){
            this.$emit('login')
        }
    }
}
</script>