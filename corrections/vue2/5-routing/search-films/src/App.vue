<template>
  <div id="app">
    <template v-if="loggedIn">
      <div id="session-info">
        Connecté en tant que <b>{{user.firstname}} {{user.lastname}}</b>
        <button @click="logout">Déconnexion</button>
      </div>
    </template>
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useSession } from './stores/session';

export default {
  computed: {
    // bind this.loggedIn to useSession().loggedIn
    ...mapState(useSession, ["loggedIn", "user"])
  },
  methods: {
    logout() {
      const session = useSession()
      session.logout()
      this.$router.push('/login')
    }
  }
}
</script>

<style>
@import './assets/base.css';
</style>
