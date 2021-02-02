<template>
  <div id="login-form">
    <form @submit.prevent="logIn" v-if="!loggedIn">
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
    <div v-else>
      <button id="logout-btn" @click="logOut">Logout</button>
      <search-film></search-film>
    </div>
  </div>
</template>

<script>
import SearchFilm from '@/components/SearchFilm.vue'
import { mapState } from 'vuex'

export default {
  name: 'LoginForm',
  components: {
    SearchFilm
  },
  data() {
    return {
      title: 'Authentification',
      email: '',
      psw: '',
      error: null
    }
  },
  computed: {
    ...mapState(['loggedIn'])
  },
  methods: {
    logIn() {
      if(this.email === 'test@test.com' && this.psw === 'test') {
        this.error = null
        return this.$store.dispatch('setLoggedIn', true)
      }
      this.psw = ''
      this.error = 'Email ou mot de passe incorrect'
    },
    logOut() {
      this.email = ''
      this.psw = ''
      this.$store.dispatch('setLoggedIn', false)
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

