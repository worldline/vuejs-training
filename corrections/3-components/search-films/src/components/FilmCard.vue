<template>
  <li class="film card">
    <img class="poster" :src="poster"/>
    <p class="title">
      {{ title }}
      <span class="rating">{{ '★'.repeat(Math.round(5 * metascore / 100))  }}</span>
    </p>
    <dl>
      <dt>Release date</dt><dd>{{ released }}</dd>
      <dt>Director</dt><dd>{{ director }}</dd>
      <dt>Actors</dt><dd>{{ actors }}</dd>
    </dl>
    <p class="plot">
      {{ plot }}
    </p>
  </li>
</template>

<script>
export default {
  name: 'FilmCard',
  props: {
    title: {
      type: String,
      required: true
    },
    metascore: {
      type: String,
      default: '0',
      validator: value => !isNaN(value)
    },
    released: String,
    director: String,
    actors: String,
    poster: String,
    plot: String,
  }
}
</script>

