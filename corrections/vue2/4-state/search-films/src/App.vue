<template>
  <div id="app">
    <login-form />
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
import '@/stylesheet.css'

export default {
  name: 'app',
  components: {
    LoginForm
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
