<template>
  <div id="search-film">
    <form @submit.prevent="searchFilms">
      <label for="search">Search :</label>
      <input id="search" type="text" v-model="query" />
    </form>

    <ul class="films">
      <Film :film="film" v-for="film in films" :key="film.title+film.released"></Film>
    </ul>
  </div>
</template>

<script>
import Film from "../components/Film.vue";
import FilmService from "../services/FilmService";

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
        searchFilms(){
            FilmService.search(this.query).then(results => {
                this.films = results
            })
        }
    }
}
</script>
