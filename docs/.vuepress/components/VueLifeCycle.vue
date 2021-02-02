<template>
<div>
    <label><input type="radio" value="2" name="vueVersion" v-model="vueVersion"> Vue 2.x</label>
    <label><input type="radio" value="3" name="vueVersion" v-model="vueVersion"> Vue 3.x</label>
    <img alt='Vue Lifecycle' :src="imageSrc" />
</div>
</template>

<script>
import LifecycleVue3EN from "../../assets/vue3_lifecycle.svg"
import LifecycleVue3FR from "../../assets/vue3_lifecycle_fr.svg"
import LifecycleVue2EN from "../../assets/vue2_lifecycle.png"
import LifecycleVue2FR from "../../assets/vue2_lifecycle_fr.png"

export default {
    name: "VueLifeCycle",
    props: {
        lang: String
    },
    data(){
        return {
            vueVersion: localStorage.getItem("preferredVueVersion") || 3
        }
    },
    computed:{
        imageSrc(){
            if(this.vueVersion === "3" && this.lang === "fr") return LifecycleVue3FR
            else if(this.vueVersion === "3") return LifecycleVue3EN
            else if(this.vueVersion === "2" && this.lang === "fr") return LifecycleVue2FR
            else return LifecycleVue2EN
        }
    },
    watch:{
        vueVersion(val){
            localStorage.setItem("preferredVueVersion", val)
        }
    }
}
</script>