<template>
<li class="film card">
    <img class="poster" :src="film.poster" />
    <p class="title">
    {{ film.title }}
    <span class="rating" v-if="film.metascore !== 'N/A'">{{ '★'.repeat(Math.ceil(film.metascore / 20)) }}</span>
    </p>
    <dl>
        <dt>Release date</dt><dd>{{ film.released }}</dd>
        <dt>Director</dt><dd>{{ film.director }}</dd>
        <dt>Actors</dt><dd>{{ film.actors }}</dd>
    </dl>
    <p class="plot">{{ film.plot }}</p>
</li>
</template>

<script>
export default {
    name: "Film",
    props: { film: Object }
}
</script>