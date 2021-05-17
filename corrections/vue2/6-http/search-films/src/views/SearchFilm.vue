<template>
  <div id="search-film">
    <form @submit.prevent="searchFilms">
      <label for="search">Search :</label>
      <input id="search" type="text" v-model="query" />
    </form>

    <ul class="films">
      <Film v-for="film in films" :key="film.title+film.director" :film="film" />
    </ul>
  </div>
</template>

<script>
import Film from "@/components/Film";
import FilmService from "@/services/FilmService";

export default {
  name: "SearchFilm",
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