<template>
  <li class="film card">
    <img class="poster" :src="film.poster"/>
    <p class="title">
      {{ film.title }}
      <span class="rating">{{ '★'.repeat(Math.round(5 * film.metascore / 100))  }}</span>
    </p>
    <dl>
      <dt>Release date</dt><dd>{{ film.released }}</dd>
      <dt>Director</dt><dd>{{ film.director }}</dd>
      <dt>Actors</dt><dd>{{ film.actors }}</dd>
    </dl>
    <p class="plot">
      {{ film.plot }}
    </p>
  </li>
</template>

<script>
export default {
  name: 'Film',
  props: ['film']
}
</script>

