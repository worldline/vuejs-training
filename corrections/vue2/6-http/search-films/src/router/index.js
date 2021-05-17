/** src/router/index.js **/
import Router from "vue-router";
import Vue from "vue";

import SearchFilm from "@/views/SearchFilm.vue";
import LoginForm from "@/views/LoginForm.vue";
import store from "@/store";

Vue.use(Router);

const router = new Router({
    mode: 'hash',
    routes: [
        {
            path: "/search",
            name: "Search",
            component: SearchFilm,
        },
        {
            path: "/login",
            name: "Login",
            component: LoginForm,
        },
        {
            path: "/",
            redirect: "/search",
        },
    ]
});

router.beforeEach((to, from, next) => {
    if (to.name !== "Login" && !store.state.loggedIn) next({ name: "Login" })
    else next()
})

export default router