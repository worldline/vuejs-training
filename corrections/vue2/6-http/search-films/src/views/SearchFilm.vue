<template>
  <div id="search-film">
    <form @submit.prevent="searchFilms">
      <label for="search">Search :</label>
      <input id="search" type="text" v-model="query" />
    </form>

    <ul class="films">
      <Film v-for="film in films" :film="film" :key="film.title + film.released" />
    </ul>
  </div>
</template>

<script>
import Film from "../components/Film.vue"
import FilmService from "../services/FilmService"

export default {
    components: { Film },
    data(){
        return {
            films: [],
            query: ""
        }
    },
    methods: {
        async searchFilms(){
            this.films = await FilmService.search(this.query)
        }
    }
}
</script>