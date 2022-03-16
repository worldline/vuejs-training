<template>
  <LoginForm v-if="!loggedIn" />
  <template v-else>
    <div v-if="loggedIn" id="session-info">
      Connecté en tant que <b>{{user.firstname}} {{user.lastname}}</b>
      <button @click="logout">Déconnexion</button>
    </div>
    <SearchFilm />
  </template>
</template>

<script>
import { mapState, mapActions } from "pinia"
import { useSession } from "./stores/session";

import LoginForm from "./components/LoginForm.vue";
import SearchFilm from "./components/SearchFilm.vue";

export default {
  name: "App",
  components: { LoginForm, SearchFilm },
  computed: {
    ...mapState(useSession, ["loggedIn", "user"])
  },
  methods: {
    ...mapActions(useSession, ["logout"])
  }
}
</script>

<style>
@import './assets/base.css';
</style>
