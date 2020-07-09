<template>
  <div id="search-film">
    <button id="logout-btn" @click="logOut">Logout</button>

    <form @submit.prevent="searchFilm" >
      <div class="alert" v-if="error">
        <span class="closebtn" @click="error = null">&times;</span>
        {{ error }}
      </div>
      <label for="search">Search:</label>
      <input id="search" type="text" v-model="title">
    </form>

    <ul class="films">
      <film v-for="film in films" :key="film.title" :film="film"></film>
    </ul>

  </div>
</template>

<script>
import Film from '@/components/Film.vue'
import FilmService from '@/services/FilmService.js'


export default {
  name: 'SearchFilm',
  components: {
    Film
  },
  data() {
    return {
      films: [],
      title: '',
      error: null
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('setUser', null)
      this.$store.dispatch('setToken', null)
      this.$router.push('login')
    },
    async searchFilm () {
      try {
        const response = await FilmService.search(this.title)
        this.films = Array.isArray(response) ? response : [response]
      } catch (error) {
        this.error = error.toString();
      }
    }
  }
}
</script>