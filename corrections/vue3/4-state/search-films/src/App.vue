<template>
  <LoginForm v-if="!loggedIn" />
  <template v-else>
    <header v-if="loggedIn" id="logout-btn">
      Connecté en tant que <b>{{user.firstname}} {{user.lastname}}</b>
      <button @click="logout">Déconnexion</button>
    </header>
    <SearchFilm />
  </template>
</template>

<script>
import "./stylesheet.css"
import { mapActions, mapState } from "pinia"
import LoginForm from '@/components/LoginForm.vue'
import SearchFilm from '@/components/SearchFilm.vue'
import { useSession } from '@/stores/session'

export default {
  name: 'App',
  components: {
    LoginForm,
    SearchFilm
  },
  computed: {
    ...mapState(useSession, ["loggedIn", "user"])
  },
  methods: {
    ...mapActions(useSession, ["logout"])
  }
}
</script>

<style>
</style>
