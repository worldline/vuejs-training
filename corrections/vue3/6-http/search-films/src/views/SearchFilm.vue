<template>
  <div id="search-film">
    <form @submit.prevent="searchFilms">
      <label for="search">Search :</label>
      <input id="search" type="text" ref="search" v-model="query" />
    </form>

    <p>{{ numberResults }} results</p>

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
    computed: {
        numberResults(){
            return this.films.length
        }
    },
    mounted(){
        this.$refs.search.focus()
    },
    watch: {
        query(){
            this.films = []
        }
    },
    methods: {
        async searchFilms(){
            this.films = await FilmService.search(this.query)
        }
    }
}
</script>
