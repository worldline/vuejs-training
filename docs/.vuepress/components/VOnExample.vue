<template>
<div class="demo">
    <button v-on:click="counter += 1"> Cliquez ici ! </button>
    Ce bouton a été cliqué {{ counter }} fois.

    <button @click="resetCounter($event)"> Remettre à zéro </button>
</div>
</template>

<script>
export default {
    name: "v-on-example",
    data(){
        return { counter: 0 }
    },
    methods: {
        resetCounter(event){
            event.stopPropagation();
            this.counter = 0;            
        }
    }
}
</script>
