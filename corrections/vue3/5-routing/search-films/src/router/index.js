import { createRouter, createWebHashHistory } from 'vue-router'

import { useSession } from "../stores/session.js";

import LoginForm from "../views/LoginForm.vue";
import SearchFilm from "../views/SearchFilm.vue";

const router = createRouter({
  history: createWebHashHistory(),
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
      path: '/:pathMatch(.*)*', 
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
