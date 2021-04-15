<template>
  <div id="login-form">
    <form @submit.prevent="logIn">
      <div class="alert" v-if="error">
        <span class="closebtn" @click="error = null">&times;</span>
        {{ error }}
      </div>
      <h1>{{ title }}</h1>
      <p>Fill this form to login.</p>
      <hr>
      <span></span>

      <label for="email"><b>Email</b></label>
      <input v-model="email" type="text" placeholder="Enter your email" id="email" name="email" required>

      <label for="psw"><b>Password</b></label>
      <input v-model="psw" type="password" placeholder="Enter your password" id="psw" name="psw" required>

      <p><button type="submit">Login</button></p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      title: 'Authentification',
      email: '',
      psw: '',
      error: null
    }
  },
  methods: {
    logIn() {
      if(this.email === 'test@test.com' && this.psw === 'test') {
        this.error = null
        this.$store.dispatch('setLoggedIn', true)
        return this.$router.push('search')

      }
      this.psw = ''
      this.error = 'Wrong email or password'
    }
  }
}
</script>

<style scoped>
/* The alert message box */
.alert {
  padding: 20px;
  background-color: #f44336; /* Red */
  color: white;
  margin-bottom: 15px;
}

/* The close button */
.closebtn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

/* When moving the mouse over the close button */
.closebtn:hover {
  color: black;
}
</style>

