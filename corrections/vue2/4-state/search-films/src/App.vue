<template>
  <div id="app">
    <LoginForm v-if="loggedIn === false" />
    <template v-else>
      <div id="session-info">
        Connecté en tant que <b>{{user.firstname}} {{user.lastname}}</b>
        <button @click="logout">Déconnexion</button>
      </div>
    <SearchFilm />
  </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useSession } from './stores/session';
import LoginForm from './components/LoginForm.vue';
import SearchFilm from './components/SearchFilm.vue';

export default {
  components: { LoginForm, SearchFilm },
  computed: {
    // bind this.loggedIn to useSession().loggedIn
    ...mapState(useSession, ["loggedIn", "user"])
  },
  methods: {
    // bind this.logout to useSession().logout
    ...mapActions(useSession, ["logout"])
  }
}
</script>

<style>
@import './assets/base.css';
</style>
