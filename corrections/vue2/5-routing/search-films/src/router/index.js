import Router from "vue-router";

import { useSession } from "../stores/session";
import LoginForm from "../views/LoginForm.vue";
import SearchFilm from "../views/SearchFilm.vue";

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginForm
    },
    {
      path: "/search",
      name: "search",
      component: SearchFilm
    },
    {
      path: "/",
      redirect: "/search",
    },
    { 
      path: '*', 
      redirect: "/search"
    }
  ]
});

router.beforeEach((to, from, next) => {
    const session = useSession()
    if (to.name !== "login" && session.loggedIn === false) next('/login')
    else next()
})

export default router;
